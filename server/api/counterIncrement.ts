import { connectToDatabase, db, closeDatabase } from "../database";
const COLLECTION = useRuntimeConfig().private.NUXT_META_COLLECTION;

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    const collection = db.collection(COLLECTION);
    const result = await collection.findOneAndUpdate(
      { _id: "response_counter" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    return { message: "Counter incremented successfully", result: result };
  } catch (error) {
    console.error("Counter not successful: ", error);
    return { message: error };
  } finally {
    await closeDatabase();
  }
});
