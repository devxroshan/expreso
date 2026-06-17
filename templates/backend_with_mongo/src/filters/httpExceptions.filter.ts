import express from "express";
import type { ErrorResponse } from "./allExceptions.filter.js";

export const httpExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
): express.Response<ErrorResponse> => {
  return res.status(err.statusCode).json({
    ok: false,
    msg: err.msg,
    details: err.details,
    path: req.url,
    timestamp: new Date().toISOString(),
  });
};
