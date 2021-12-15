import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListUfController } from "../../../../modules/uf/useCases/listUf/ListUfController";

const listUfController = new ListUfController();

const ufRouter = Router();

ufRouter.get("/list", EnsureAuthenticated, listUfController.handle);

export { ufRouter };