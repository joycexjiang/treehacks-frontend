import { mutation } from "./_generated/server";

// Generate a short-lived upload URL.
export const generateUploadUrl = mutation(async ({ storage }) => {
  return await storage.generateUploadUrl();
});
// Save the storage ID within a message.
export const sendImage = mutation(async ({ db }, storageId, author) => {
  const message = { body: storageId, author, format: "image" };
  await db.insert("messages", message);
});
