import express, { request, response } from "express";
import { PORT } from "./config.js";
import { MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express()

//to parse json request body
app.use(express.json());

//use as MiddleWare
app.use("/books", bookRoute);

app.use(cors()); // default = *

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

//connecting to DB
mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log(`Connected to MongoDB!`);
        //listening to port; connecting to port only if connected to DB
        app.listen(PORT, () => {
            console.log(`Listening in port: ${PORT}`)
        }
        );
    })
    .catch(() => {
        console.log(error);
    });