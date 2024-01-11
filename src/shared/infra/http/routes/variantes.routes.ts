import { Router } from "express";

import { CreateVarianteController } from "../../../../modules/variantes/useCases/createVariante/CreateVarianteController";
import { CreateVarianteValoresController } from "../../../../modules/variantes/useCases/createVarianteValores/CreateVarianteValoresController";
import { DeleteVarianteController } from "../../../../modules/variantes/useCases/deleteVariante/DeleteVarianteController";
import { DeleteVarianteValoresController } from "../../../../modules/variantes/useCases/deleteVarianteValores/DeleteVarianteValoresController";
import { FindByIdVarianteController } from "../../../../modules/variantes/useCases/findByIdVariante/FindByIdVarianteController";
import { ListVariantesController } from "../../../../modules/variantes/useCases/listVariantes/ListVariantesController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createVarianteController = new CreateVarianteController();
const createVarianteValoresController = new CreateVarianteValoresController();
const deleteVarianteController = new DeleteVarianteController();
const deleteVarianteValoresController = new DeleteVarianteValoresController();
const listVariantesController = new ListVariantesController();
const findByIdVarianteController = new FindByIdVarianteController();

const variantesRoutes = Router();

variantesRoutes.get("/", EnsureAuthenticated, listVariantesController.handle);
variantesRoutes.post("/findAll", EnsureAuthenticated, listVariantesController.handle);
variantesRoutes.get("/:id", EnsureAuthenticated, findByIdVarianteController.handle);

variantesRoutes.post("/", EnsureAuthenticated, createVarianteController.handle);

variantesRoutes.post("/valores", EnsureAuthenticated, createVarianteValoresController.handle);

variantesRoutes.delete("/", EnsureAuthenticated, deleteVarianteController.handle);

variantesRoutes.delete("/valores", EnsureAuthenticated, deleteVarianteValoresController.handle);

export { variantesRoutes };