import { Request, Response, NextFunction } from "express";
import { getAnalytics } from "../services/analyticsService";
import { createHttpError, isHttpError } from "../utils/httpError";

//GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD
//Returns total hours and revenue per room for the given date range

export const analyticsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      throw createHttpError(
        "from and to query params are required (YYYY-MM-DD)",
        400
      );
    }

    if (typeof from !== "string" || typeof to !== "string") {
      throw createHttpError(
        "from and to must be strings in YYYY-MM-DD format",
        400
      );
    }

    const fromDate = new Date(`${from}T00:00:00.000Z`);
    const toDate = new Date(`${to}T23:59:59.999Z`);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw createHttpError(
        "Invalid from/to date format (expected YYYY-MM-DD)",
        400
      );
    }

    const data = await getAnalytics(fromDate, toDate);
    res.json(data);
  } catch (err) {
    if (isHttpError(err)) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};
