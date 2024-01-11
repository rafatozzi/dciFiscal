import "reflect-metadata";
import "dotenv/config";
import "../typeorm";
import "../../container";

import Queue from "../../../jobs/lib/queue";

Queue.process();