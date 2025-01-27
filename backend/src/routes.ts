import { Router } from "express";
import multer from 'multer'
import { importFile } from "./controllers/transaction/importFile";
import { getAll } from "./controllers/transaction/getAll";
import { storage } from "./config/multer"
const routes = Router();

const upload = multer({ storage })

routes.post('/transactions/import', upload.single('file'), importFile)
routes.get('/transactions',  getAll)


export default routes