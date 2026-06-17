import type { Request, Response } from "express";
import mongoose from "mongoose";

import {
  sendErrorResponse,
  type ErrorResponse,
} from "./allExceptions.filter.js";

export const mongoDBExceptionFilter = (
  err: any,
  req: Request,
  res: Response,
): Response<ErrorResponse> => {
  if (err instanceof mongoose.Error.ValidationError) {
    return sendErrorResponse(res, req, 422, "Validation failed", {
      fields: Object.values(err.errors).map((e: any) => ({
        field: e.path,
        kind: e.kind,
        message: e.message,
        value: e.value,
      })),
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return sendErrorResponse(
      res,
      req,
      400,
      `Invalid value for field "${err.path}"`,
      {
        field: err.path,
        expectedType: err.kind,
        receivedValue: err.value,
      },
    );
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return sendErrorResponse(res, req, 404, "Document not found", {
      filter: err.message,
    });
  }

  if (err instanceof mongoose.Error.VersionError) {
    return sendErrorResponse(
      res,
      req,
      409,
      "Document version conflict – please retry",
      {
        documentId: (err as any).doc,
        modifiedPaths: (err as any).modifiedPaths,
      },
    );
  }

  if (err instanceof mongoose.Error.ParallelSaveError) {
    return sendErrorResponse(
      res,
      req,
      409,
      "Parallel save detected on the same document",
      {},
    );
  }

  if (err instanceof mongoose.Error.StrictModeError) {
    return sendErrorResponse(
      res,
      req,
      400,
      "Unknown field rejected by strict mode",
      {
        field: (err as any).path,
      },
    );
  }

  if (err instanceof mongoose.Error.MissingSchemaError) {
    return sendErrorResponse(
      res,
      req,
      500,
      "Schema not registered for this model",
      {
        model: err.message,
      },
    );
  }

  if (err instanceof mongoose.Error.OverwriteModelError) {
    return sendErrorResponse(res, req, 500, "Model registered more than once", {
      model: err.message,
    });
  }

  if (err?.code === 11000 || err?.code === 11001) {
    const keyValue: Record<string, unknown> = err.keyValue ?? {};
    return sendErrorResponse(
      res,
      req,
      409,
      "Duplicate key – resource already exists",
      {
        conflictingFields: Object.keys(keyValue),
        conflictingValues: keyValue,
      },
    );
  }

  if (err instanceof mongoose.mongo.MongoNetworkError) {
    return sendErrorResponse(
      res,
      req,
      503,
      "Database unreachable – please try again later",
      {},
    );
  }

  if (err instanceof mongoose.mongo.MongoNetworkTimeoutError) {
    return sendErrorResponse(
      res,
      req,
      504,
      "Database connection timed out",
      {},
    );
  }

  if (err instanceof mongoose.mongo.MongoServerSelectionError) {
    return sendErrorResponse(
      res,
      req,
      503,
      "No database server available right now",
      {
        reason: err.message,
      },
    );
  }

  if (
    err instanceof mongoose.mongo.MongoExpiredSessionError ||
    err?.codeName === "CursorNotFound" ||
    err?.code === 43
  ) {
    return sendErrorResponse(
      res,
      req,
      408,
      "Database cursor or session expired – retry",
      {},
    );
  }

  if (err?.codeName === "WriteConflict" || err?.code === 112) {
    return sendErrorResponse(
      res,
      req,
      409,
      "Transaction write conflict – please retry",
      {},
    );
  }

  if (
    err?.codeName === "TransactionExceededLifetimeLimitSeconds" ||
    err?.code === 290
  ) {
    return sendErrorResponse(res, req, 408, "Transaction timed out", {});
  }

  if (
    err instanceof mongoose.mongo.MongoServerError &&
    (err.code === 18 || err.codeName === "AuthenticationFailed")
  ) {
    return sendErrorResponse(
      res,
      req,
      500,
      "Database authentication failed",
      {},
    );
  }

  if (err instanceof mongoose.mongo.MongoServerError) {
    return sendErrorResponse(res, req, 500, "MongoDB server error", {
      code: err.code,
      codeName: (err as any).codeName,
      message: err.message,
    });
  }

  return sendErrorResponse(res, req, 500, "Unexpected Mongoose error", {
    name: err.name,
    message: err.message,
  });
};
