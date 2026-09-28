import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
})

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> =
  (models.User as Model<User> | undefined) ?? model<User>("User", userSchema)
