import "server-only"

import mongoose, { type Mongoose } from "mongoose"

/**
 * Cached Mongoose connection.
 *
 * Serverless functions and dev HMR both re-evaluate modules; without a cache
 * each evaluation would open a new pool connection until Atlas refuses them.
 * The promise is cached too, so concurrent callers share one connect().
 */
type MongooseCache = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

function resolveMongoUri(): string {
  const environment = process.env.MONGODB_ENV

  if (environment !== "development" && environment !== "production") {
    throw new Error(
      'Missing or invalid MONGODB_ENV. Set it to "development" or "production".'
    )
  }

  const uri =
    environment === "production"
      ? process.env.MONGODB_URI_PRODUCTION
      : process.env.MONGODB_URI_DEVELOPMENT

  if (!uri) {
    throw new Error(
      `Missing MONGODB_URI_${environment.toUpperCase()}. Copy .env.example to .env.local and set it.`
    )
  }

  return uri
}

export async function connect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(resolveMongoUri(), {
      bufferCommands: false,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}
