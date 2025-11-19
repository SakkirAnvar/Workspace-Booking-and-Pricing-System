import { Request, Response, NextFunction } from "express";
import { Room } from "../models/Room";

export const listRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await Room.find().exec();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};
