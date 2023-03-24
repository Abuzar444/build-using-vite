import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express from 'express';
const app = express();;

import morgan from 'morgan';
import { dirname } from "path";
import { fileURLToPath } from 'url';
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors" 
// db
import connectDB from "./db/connect.js";
// middleware
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from './middleware/error-handler.js';
// routes
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

import authenticatedUser from "./middleware/auth.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan('dev'));
}

// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 80
// }
// ));
app.use(express.static(path.resolve(__dirname,"./client/dist")))

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticatedUser, jobsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
})

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const serverURL = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(serverURL, () => {
      console.log(`server listening on port ${serverURL}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();