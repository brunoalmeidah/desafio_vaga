import express, { Response } from 'express'
import {connect} from 'mongoose'
import Youch from 'youch';
import { Request } from 'express';
import routes from './routes';
import { env } from './env';

export const app = express();

connect(env.DATABASE_URL).then(()=>{console.log('Connected to database')}).catch((err)=>{console.log(err)})
app.use(express.json());

app.use(routes)

app.use(async (err: Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'dev') {
    const errors = await new Youch(err, req).toJSON();
     res.status(500).json(errors);
  }
   res.status(500).json({ error: 'Internal server error' });
});