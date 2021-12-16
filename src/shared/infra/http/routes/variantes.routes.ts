import { Router } from "express";

import { CreateVarianteController } from "../../../../modules/variantes/useCases/createVariante/CreateVarianteController";
import { CreateVarianteValoresController } from "../../../../modules/variantes/useCases/createVarianteValores/CreateVarianteValoresController";
import { DeleteVarianteController } from "../../../../modules/variantes/useCases/deleteVariante/DeleteVarianteController";
import { DeleteVarianteValoresController } from "../../../../modules/variantes/useCases/deleteVarianteValores/DeleteVarianteValoresController";
import { ListVariantesController } from "../../../../modules/variantes/useCases/listVariantes/ListVariantesController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createVarianteController = new CreateVarianteController();
const createVarianteValoresController = new CreateVarianteValoresController();
const deleteVarianteController = new DeleteVarianteController();
const deleteVarianteValoresController = new DeleteVarianteValoresController();
const listVariantesController = new ListVariantesController();

const variantesRoutes = Router();

variantesRoutes.get("/", EnsureAuthenticated, listVariantesController.handle);

variantesRoutes.post("/", EnsureAuthenticated, createVarianteController.handle);

variantesRoutes.post("/valores", EnsureAuthenticated, createVarianteValoresController.handle);

variantesRoutes.delete("/", EnsureAuthenticated, deleteVarianteController.handle);

variantesRoutes.delete("/valores", EnsureAuthenticated, deleteVarianteValoresController.handle);

export { variantesRoutes };