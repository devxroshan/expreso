import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { HttpException } from "../config/http-exceptions.js";
import { httpExceptionFilter } from "./httpExceptions.filter.js";
import { mongoDBExceptionFilter } from "./mongoDBExceptions.filter.js";
import { jwtExceptionFilter } from "./jwtException.filter.js";

export interface ErrorResponse {
  ok: false;
  msg: string;
  details: any;
  path: string;
  timestamp: string;
}

export const sendErrorResponse = (
  res: express.Response,
  req: express.Request,
  statusCode: number,
  msg: string,
  details: any = {},
): express.Response<ErrorResponse> => {
  return res.status(statusCode).json({
    ok: false,
    statusCode,
    msg,
    details,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};

const isMongoError = (err: any): boolean => {
  return (
    err instanceof mongoose.Error ||
    err instanceof mongoose.mongo.MongoServerError ||
    err instanceof mongoose.mongo.MongoNetworkError ||
    err instanceof mongoose.mongo.MongoBulkWriteError ||
    (typeof err === "object" &&
      err !== null &&
      "code" in err &&
      ((err as any).code === 11000 || (err as any).code === 11001))
  );
};

const isJwtError = (err: any): boolean => {
  return (
    err instanceof jwt.TokenExpiredError ||
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.NotBeforeError
  );
};

export const allExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
): express.Response<ErrorResponse> => {
  if (err instanceof HttpException) return httpExceptionFilter(err, req, res);
  else if (isMongoError(err)) return mongoDBExceptionFilter(err, req, res);
  else if (isJwtError(err)) return jwtExceptionFilter(err, req, res);

  return sendErrorResponse(res, req, 500, "Unknown error.");
};
