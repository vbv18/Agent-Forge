import getModel from "../config/llm.js";
import generatePDF from "../utils/generate-pdf.js";
import getSystemPrompt from "../utils/system-prompt.js";
import { uploadToS3, getFromS3 } from "../utils/s3.utils.js";

export async function pdfAgent(state) {
  try {
    const llm = getModel("pdf");
    const systemPrompt = getSystemPrompt("pdf", state.prompt);

    const response = await llm.invoke(systemPrompt);
    const data = JSON.parse(response.content.trim());
    const pdfBuffer = await generatePDF(data);

    const fileName = `${data.title}-${Date.now()}.pdf`;

    await uploadToS3(fileName, pdfBuffer, "application/pdf");

    const urlExpiresIn = 24 * 60; // minutes
    const downloadUrl = await getFromS3(fileName, urlExpiresIn);

    return {
      ...state,
      aiResponse: `
# PDF Generated

**${data.title}**

[DownLoad PDF](${downloadUrl})
_Link will expire in 24 hours._
    `,
    };
  } catch (error) {
    console.warn("[Image-Agent Error]", error);
    return {
      ...state,
      aiResponse: "Failed to generate pdf!",
    };
  }
}
