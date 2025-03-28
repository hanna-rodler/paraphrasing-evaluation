import { connectToDatabase, db, closeDatabase } from "../database";
import { readBody } from "h3";
const COLLECTION =
  useRuntimeConfig().private.NUXT_PARAPHRASING_RATING_COLLECTION;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", data: result, status: 200 };
  } catch (error) {
    return {
      message: "Error saving survey data",
      error: error.message,
      status: 500,
    };
  } finally {
    await closeDatabase();
  }
});
