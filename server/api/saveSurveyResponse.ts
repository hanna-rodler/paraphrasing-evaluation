import { connectToDatabase, db, closeDatabase } from "../database";
import { readBody } from "h3";
const COLLECTION = useRuntimeConfig().private.NUXT_SURVEY_COLLECTION;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", result };
  } catch (error) {
    return {
      message: "Database connection failed!",
      error: error.message,
    };
  } finally {
    await closeDatabase();
  }
});
