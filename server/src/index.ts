import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import Service from './servers';
dotenv.config();

const app = express();
app.use(cors());
createConnection().then(() => {
  console.log('connect success');
})

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use('/', Service);

// app.use(function (err: any, req, res, next) {
//   if (err) {
//     let errs = {
//       statusCode: err.statusCode,
//       message: err.details.body[0].message
//     }
//     return res.status(err.statusCode).json(errs)
//   }
//   return res.status(500).json(err)
// })
app.listen(PORT, () => {
  console.log('App running on port : ' + PORT);
})
