export interface HttpError extends Error {
  statusCode: number;
}

export const createHttpError = (
  message: string,
  statusCode = 400
): HttpError => {
  const err = new Error(message) as HttpError;
  err.statusCode = statusCode;
  return err;
};

export const isHttpError = (err: unknown): err is HttpError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    typeof (err as any).statusCode === "number"
  );
};
