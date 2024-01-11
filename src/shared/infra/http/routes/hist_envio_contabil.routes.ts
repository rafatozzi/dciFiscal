import { Router } from "express";
import { FindAllHistEnvioContabilController } from "../../../../modules/histEnvioContabil/useCases/findAllHistEnvioContabil/FindAllHistEnvioContabilController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const findAllHistEnvioContabilController = new FindAllHistEnvioContabilController();

const histEnvioContabilRoutes = Router();

histEnvioContabilRoutes.get("/", EnsureAuthenticated, findAllHistEnvioContabilController.handle);

export { histEnvioContabilRoutes };