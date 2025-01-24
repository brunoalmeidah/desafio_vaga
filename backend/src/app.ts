import express from 'express'
import Youch from 'youch';
import { Request, NextFunction } from 'express';

export const app = express();

app.use(express.json());

app.use(async (err: Error, req: Request, res: any, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  return res.status(500).json({ error: 'Internal server error' });
});