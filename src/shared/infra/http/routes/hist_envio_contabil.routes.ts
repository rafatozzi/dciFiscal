import { Router } from "express";
// import { } from "../../../../modules/nfe/useCases/enviaEmailContador/EnviaEmailContadorController";
// import {  } from "../../../../modules/histEnvioContabil/";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const histEnvioContabilRoutes = Router();

histEnvioContabilRoutes.get("/", EnsureAuthenticated);

export { histEnvioContabilRoutes };