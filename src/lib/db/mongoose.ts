import mongoose from "mongoose";

import { getServerEnv } from "@/lib/env/server";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalForMongoose.mongooseCache = cache;

export async function connectToDatabase() {
  if (cache.connection) return cache.connection;

  const { MONGODB_DB, MONGODB_URI } = getServerEnv();
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is required for database operations.");
  }

  cache.promise ??= mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    maxPoolSize: 10,
  });

  cache.connection = await cache.promise;
  return cache.connection;
}
