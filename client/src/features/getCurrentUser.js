import { api } from "../../utils/axios.js";

export default async function getCurrentUser() {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    console.error("[Get-Current-User Error]", error);
    return null;
  }
}
