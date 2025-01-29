import { Response } from 'express';

export const response = <T>(
  res: Response,
  statusCode: number,
  ok: boolean,
  data: T,
  message: string,
) => {
  res.status(statusCode).json({ ok, data, message });
};
