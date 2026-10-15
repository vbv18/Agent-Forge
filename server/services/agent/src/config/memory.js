import redis from "../../../../shared/redis/redis.js";
import getMessages from "../utils/getMessages.js";
import { AGENT_MEMORY_TTL } from "../../../lib/constant.js";

export async function getMemory(conversationId) {
  if (!conversationId) return [];
  const key = `messages-${conversationId}`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error("[Get-Memory Cache Error]", err?.message || err);
  }

  const messages = (await getMessages(conversationId)) || [];

  try {
    await redis.set(key, JSON.stringify(messages), "EX", AGENT_MEMORY_TTL);
  } catch (err) {
    console.error("[Set-Memory Cache Error]", err?.message || err);
  }

  return messages;
}

export async function updateMemoryBatch(conversationId, newMessages) {
  if (!conversationId) return;

  const key = `messages-${conversationId}`;

  if (!Array.isArray(newMessages) || newMessages.length === 0) {
    return;
  }

  // Recover the cache if it expired before this update.
  let messages;

  try {
    const cached = await redis.get(key);

    if (cached) {
      messages = JSON.parse(cached);
      if (!Array.isArray(messages)) {
        messages = await getMessages(conversationId);
      }
    } else {
      messages = await getMessages(conversationId);
    }
  } catch (err) {
    console.error("[Update-Memory Read Error]", err?.message || err);
    throw err;
  }

  messages = [...messages, ...newMessages];

  // Retain only recent messages.
  messages = messages.slice(-20);

  try {
    await redis.set(key, JSON.stringify(messages), "EX", AGENT_MEMORY_TTL);
  } catch (err) {
    console.error("[Update-Memory Set Error]", err?.message || err);
    throw err;
  }
}

export async function updateMemory(conversationId, role, content) {
  return updateMemoryBatch(conversationId, [{ role, content }]);
}
