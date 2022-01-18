import express, { Request, Response, NextFunction, query } from "express";
import cors from "cors";
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import Queue from "../../../jobs/lib/queue";

import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import "../typeorm";
import "../../container";

import { router } from "./routes";
import { AppError } from "../../errors/AppError";
import upload from "../../../config/upload";
import { midConnection } from "./middlewares/midConnection";

// const someQueue = new Queue('someQueueName')
// const someOtherQueue = new Queue('someOtherQueueName')
// const queueMQ = new QueueMQ('queueMQName')

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: Queue.queues.map(query => query.bull),
  serverAdapter: serverAdapter
});

const app = express();

app.use(cors());

app.use(express.json());

app.use("/queue", serverAdapter.getRouter());

app.use("/certificado", express.static(`${upload.tmpFolder}/cert`));

app.use(midConnection);

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