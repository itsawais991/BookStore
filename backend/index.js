import express from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookroutes from "./routes/bookroutes.js"
import cors from 'cors';

const app = express();

app.use(express.json());

//----midleware for handling cors--------//
// allow all error with default of cors------//
app.use(cors());
// second option for allow custum origins  //
app.use(
    cors({
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
   console.log(request)
   return response.status(234).send('welcome to book store app');
});

//app.listen(PORT , () => {
//    console.log('app is listening to port: ${PORT}');
// });
            //--------- code to get the new book---------------//

app.use('/book', bookroutes);

mongoose
 .connect(mongodbURL)
 .then(()=>{
  console.log('app is connect to database');
  app.listen(PORT , () => {
    console.log(`app is listening to port ${PORT}`);
});
 })
 .catch((error)=>{
  console.log('error');
 });