import { Router } from "express";

import { CreateStatusController } from "../../../../modules/status/useCases/createStatus/CreateStatusController";
import { DeleteStatusController } from "../../../../modules/status/useCases/deleteStatus/DeleteStatusController";
import { FindAllStatusController } from "../../../../modules/status/useCases/findAllStatus/FindAllStatusController";
import { FindStatusByIdController } from "../../../../modules/status/useCases/findStatusById/FindStatusByIdController";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();
const findAllStatusController = new FindAllStatusController();
const findStatusByIdController = new FindStatusByIdController();

const statusRoutes = Router();

statusRoutes.get("/", EnsureAuthenticated, findAllStatusController.handle);
statusRoutes.post("/findAll", EnsureAuthenticated, findAllStatusController.handle);

statusRoutes.get("/:id", EnsureAuthenticated, findStatusByIdController.handle);

statusRoutes.post("/", EnsureAuthenticated, createStatusController.handle);

statusRoutes.delete("/", EnsureAuthenticated, deleteStatusController.handle);

export { statusRoutes };