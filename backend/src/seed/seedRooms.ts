import dotenv from "dotenv";
import { connectDB } from "../config/db";
import { Room } from "../models/Room";

dotenv.config();

const seed = async () => {
  await connectDB();

  const count = await Room.countDocuments();
  if (count > 0) {
    console.log("Rooms already exist, skipping seed.");
    process.exit(0);
  }

  await Room.insertMany([
    { name: "Cabin 1", baseHourlyRate: 300, capacity: 4 },
    { name: "Cabin 2", baseHourlyRate: 400, capacity: 6 },
    { name: "Conference A", baseHourlyRate: 500, capacity: 10 },
    { name: "Huddle Room", baseHourlyRate: 250, capacity: 3 },
  ]);

  console.log("✅ Rooms seeded");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
