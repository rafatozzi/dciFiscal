import { Router } from "express";

import { CreateStatusController } from "../../../../modules/status/useCases/createStatus/CreateStatusController";
import { DeleteStatusController } from "../../../../modules/status/useCases/deleteStatus/DeleteStatusController";
import { FindAllStatusController } from "../../../../modules/status/useCases/findAllStatus/FindAllStatusController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";


const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();
const findAllStatusController = new FindAllStatusController();

const statusRoutes = Router();

statusRoutes.get("/", EnsureAuthenticated, findAllStatusController.handle);

statusRoutes.post("/", EnsureAuthenticated, createStatusController.handle);

statusRoutes.delete("/", EnsureAuthenticated, deleteStatusController.handle);

export { statusRoutes };