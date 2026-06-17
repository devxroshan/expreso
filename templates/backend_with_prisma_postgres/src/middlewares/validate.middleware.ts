import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

interface ZodFieldError {
  field: string;
  message: string;
  code: string;
  received?: unknown;
}

const formatZodError = (error: ZodError): ZodFieldError[] => {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
    code: issue.code,
    ...("received" in issue && { received: issue.received }),
  }));
};

export const validate =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, ZodFieldError[]> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.body = formatZodError(result.error);
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.params = formatZodError(result.error);
      } else {
        (req as any).params = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.query = formatZodError(result.error);
      } else {
        (req as any).query = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(422).json({
        ok: false,
        msg: "Validation failed",
        details: errors,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  };

export const validateBody = (schema: ZodType) => validate({ body: schema });

export const validateParams = (schema: ZodType) => validate({ params: schema });

export const validateQuery = (schema: ZodType) => validate({ query: schema });
