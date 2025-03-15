import { connectToDatabase, db, closeDatabase } from "../database";
const COLLECTION = useRuntimeConfig().private.NUXT_REGISTRATION_COLLECTION;

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    const collection = db.collection("metadata");
    const responseCounter = await collection.findOne({
      _id: "response_counter",
    });
    const viewCounter = await collection.findOneAndUpdate(
      { _id: "view_counter" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );
    const result = {
      responseCounter: responseCounter?.count,
      viewCounter: viewCounter?.count,
    };
    console.log("result BE", result);

    //   const counter = await db.collection("survey_meta").findOne({ _id: "response_counter" });
    //   return { count: counter?.count ?? 0 };
    return { message: "Counter gotten successfully", counters: result };
  } catch (error) {
    console.error("counter", error);
    return { message: error };
  } finally {
    await closeDatabase();
  }
});
