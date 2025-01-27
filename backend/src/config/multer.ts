import multer from "multer";
import { extname } from 'path';
import crypto from 'crypto';

export const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    crypto.randomBytes(16, (err, res) => {
      if (err) return cb(err, file.originalname);
      return cb(null, res.toString('hex') + extname(file.originalname)); 
    });
  },
})