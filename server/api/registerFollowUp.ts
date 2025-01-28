import { connectToDatabase, db, closeDatabase } from "../database";
import { readBody } from "h3";
const COLLECTION = useRuntimeConfig().private.NUXT_REGISTRATION_COLLECTION;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.insertOne(body);
    return { message: "Data inserted successfully", result };
  } catch (error) {
    console.error("registration", error);
    return { message: error };
  } finally {
    await closeDatabase();
  }
});
