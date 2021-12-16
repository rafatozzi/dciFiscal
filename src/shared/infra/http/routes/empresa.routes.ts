import { Router } from "express";

import { CreateEmpresaController } from "../../../../modules/empresas/useCases/createEmpresa/CreateEmpresaController";
import { DeleteEmpresaController } from "../../../../modules/empresas/useCases/deleteEmpresa/deleteEmpresaController";
import { FindByIdController } from "../../../../modules/empresas/useCases/findById/FindByIdController";
import { ListEmpresasController } from "../../../../modules/empresas/useCases/listEmpresas/ListEmpresasController";
import { EnsureAdmin } from "../middlewares/ensureAdmin";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createEmpresa = new CreateEmpresaController();
const deleteEmpresa = new DeleteEmpresaController();
const findById = new FindByIdController();
const listEmpresas = new ListEmpresasController();

const empresaRoutes = Router();

empresaRoutes.get("/", EnsureAuthenticated, listEmpresas.handle);

empresaRoutes.get("/find", EnsureAuthenticated, findById.handle);

empresaRoutes.post("/", EnsureAuthenticated, createEmpresa.handle);

empresaRoutes.delete("/", EnsureAuthenticated, EnsureAdmin, deleteEmpresa.handle);

export { empresaRoutes };