import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

const RoomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true
  },
  baseHourlyRate: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

export const Room = mongoose.model<IRoom>("Room", RoomSchema)
