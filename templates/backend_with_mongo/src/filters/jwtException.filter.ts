import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  sendErrorResponse,
  type ErrorResponse,
} from "./allExceptions.filter.js";

export const jwtExceptionFilter = (
  err: any,
  req: Request,
  res: Response,
): Response<ErrorResponse> => {
  if (err instanceof jwt.TokenExpiredError) {
    return sendErrorResponse(res, req, 401, "Token has expired", {
      expiredAt: err.expiredAt,
    });
  }

  if (err instanceof jwt.NotBeforeError) {
    return sendErrorResponse(res, req, 401, "Token is not yet active", {
      activeAt: err.date,
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    if (err.message === "jwt must be provided") {
      return sendErrorResponse(res, req, 401, "No token provided");
    }

    if (err.message === "jwt malformed") {
      return sendErrorResponse(res, req, 401, "Token is malformed");
    }

    if (err.message === "invalid signature") {
      return sendErrorResponse(res, req, 401, "Token signature is invalid");
    }

    if (err.message.startsWith("invalid algorithm")) {
      return sendErrorResponse(
        res,
        req,
        401,
        "Token algorithm is not accepted",
        {
          detail: err.message,
        },
      );
    }

    if (err.message === "jwt must have three components") {
      return sendErrorResponse(res, req, 401, "Token structure is invalid");
    }

    if (err.message.startsWith("jwt audience invalid")) {
      return sendErrorResponse(res, req, 401, "Token audience is not accepted");
    }

    if (err.message.startsWith("jwt issuer invalid")) {
      return sendErrorResponse(res, req, 401, "Token issuer is not accepted");
    }

    if (err.message.startsWith("jwt subject invalid")) {
      return sendErrorResponse(res, req, 401, "Token subject is not accepted");
    }

    if (err.message.startsWith("jwt jwtid invalid")) {
      return sendErrorResponse(res, req, 401, "Token ID is not accepted");
    }

    if (err.message === "secretOrPublicKey must have a value") {
      return sendErrorResponse(
        res,
        req,
        500,
        "Token verification is misconfigured",
      );
    }
  }

  return sendErrorResponse(res, req, 401, "Token is invalid", {
    detail: err.message,
  });
};
