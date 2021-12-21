import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import "../typeorm";
import "../../container";

import { router } from "./routes";
import { AppError } from "../../errors/AppError";
import upload from "../../../config/upload";
import { midConnection } from "./middlewares/midConnection";

const app = express();

app.use(cors());

app.use(express.json());

app.use(midConnection);

app.use("/certificado", express.static(`${upload.tmpFolder}/cert`));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});

app.listen(3333, () => console.log("Server is running"));