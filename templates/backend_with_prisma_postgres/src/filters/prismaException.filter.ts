import express from "express";
import { Prisma } from "../generated/prisma/client.js";
import type { ErrorResponse } from "./allExceptions.filter.js";

export const prismaExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
): express.Response<ErrorResponse> => {
  let statusCode = 500;
  let msg = "Database Error";
  let details: any = {};

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    msg = "Validation Error in query";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    msg = "Database connection failed";
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    msg = "Prisma internal engine error";
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    msg = "Unknown database error";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const error = err as Prisma.PrismaClientKnownRequestError;

    switch (error.code) {
      case "P2002":
        statusCode = 409;
        msg = "Duplicate field error";
        details = error.meta;
        break;

      case "P2025":
        statusCode = 404;
        msg = "Record not found";
        details = error.meta;
        break;

      case "P2003":
        statusCode = 400;
        msg = "Foreign key constraint failed";
        details = error.meta;
        break;

      case "P2014":
        statusCode = 400;
        msg = "Invalid relation reference";
        details = error.meta;
        break;

      default:
        statusCode = 500;
        msg = "Database request error";
        details = {
          code: error.code,
          meta: error.meta,
        };
    }
  } else {
    msg = "Unknown error";
  }

  return res.status(statusCode).json({
    ok: false,
    msg,
    details,
    path: req.url,
    timestamp: new Date().toISOString(),
  });
};
