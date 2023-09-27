import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';


const app = express();

//midleware for parsing req body
app.use(express.json());


//moddleware for handling CORS POLICY 
//opt:-1 Allow all origin with def of cors(*)
 app.use(cors());
//opt:-2 Allow custome origin 
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get("/", (req, resp) => {
  console.log(req);
  return resp.status(234).send("Welcome to the My MERN stack Project..!");
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the Database..!");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
