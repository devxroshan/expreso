import express from "express";

interface IResponse {
  msg: string;
  data?: any;
  statusCode?: number;
}

type TController = (
  req: express.Request,
  res: express.Response,
) => Promise<void | IResponse>;

export const asyncRequestHandler = (fn: TController) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    fn(req, res)
      .then((value) => {
        if (res.headersSent) return;
        if (value) {
          const { msg, data, statusCode = 200 } = value as IResponse;
          res.status(statusCode).json({
            ok: true,
            msg,
            data,
          });
        } else {
          res.status(200).json({
            ok: true,
            msg: "Default controller response",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
};
