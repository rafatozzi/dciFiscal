import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAllCidadesController } from "../../../../modules/cidades/useCases/listAll/ListAllCidadesController";
import { ListByUfController } from "../../../../modules/cidades/useCases/listByUf/ListByUfController";

const listAllCidadesController = new ListAllCidadesController();
const listByUfController = new ListByUfController();

const cidadesRouter = Router();

cidadesRouter.get("/list", EnsureAuthenticated, listAllCidadesController.handle);
cidadesRouter.get("/uf", EnsureAuthenticated, listByUfController.handle);

export { cidadesRouter };