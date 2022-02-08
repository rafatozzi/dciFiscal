import { Router } from "express";

import { CreateFormaPgtoController } from "../../../../modules/forma_pgto/useCases/createFormaPgto/CreateFormaPgtoController";
import { CreateFormaPgtoBandController } from "../../../../modules/forma_pgto/useCases/createFormaPgtoBand/CreateFormaPgtoBandController";
import { CreateFormaPgtoBandTaxasController } from "../../../../modules/forma_pgto/useCases/createFormaPgtoBandTaxas/CreateFormaPgtoBandTaxasController";
import { DeleteFormaPgtoController } from "../../../../modules/forma_pgto/useCases/deleteFormaPgto/DeleteFormaPgtoController";
import { DeleteFormaPgtoBandController } from "../../../../modules/forma_pgto/useCases/deleteFormaPgtoBand/DeleteFormaPgtoBandController";
import { DeleteFormaPgtoBandTaxasController } from "../../../../modules/forma_pgto/useCases/deleteFormaPgtoBandTaxas/DeleteFormaPgtoBandTaxasController";
import { FindAllFormaPgtoController } from "../../../../modules/forma_pgto/useCases/findAllFormaPgto/FindAllFormaPgtoController";
import { FindFormaPgtoByIdController } from "../../../../modules/forma_pgto/useCases/findFormaPgtoById/FindFormaPgtoByIdController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createFormaPgtoController = new CreateFormaPgtoController();
const createFormaPgtoBandController = new CreateFormaPgtoBandController();
const createFormaPgtoBandTaxasController = new CreateFormaPgtoBandTaxasController();
const deleteFormaPgtoController = new DeleteFormaPgtoController();
const deleteFormaPgtoBandController = new DeleteFormaPgtoBandController();
const deleteFormaPgtoBandTaxasController = new DeleteFormaPgtoBandTaxasController();
const findAllFormaPgtoController = new FindAllFormaPgtoController();
const findFormaPgtoByIdController = new FindFormaPgtoByIdController();

const formaPgtoRoutes = Router();

formaPgtoRoutes.get("/", EnsureAuthenticated, findAllFormaPgtoController.handle);
formaPgtoRoutes.post("/findAll", EnsureAuthenticated, findAllFormaPgtoController.handle);

formaPgtoRoutes.get("/:id", EnsureAuthenticated, findFormaPgtoByIdController.handle);

formaPgtoRoutes.post("/", EnsureAuthenticated, createFormaPgtoController.handle);
formaPgtoRoutes.post("/bandeiras", EnsureAuthenticated, createFormaPgtoBandController.handle);
formaPgtoRoutes.post("/taxas", EnsureAuthenticated, createFormaPgtoBandTaxasController.handle);

formaPgtoRoutes.delete("/", EnsureAuthenticated, deleteFormaPgtoController.handle);
formaPgtoRoutes.delete("/bandeiras", EnsureAuthenticated, deleteFormaPgtoBandController.handle);
formaPgtoRoutes.delete("/taxas", EnsureAuthenticated, deleteFormaPgtoBandTaxasController.handle);

export { formaPgtoRoutes };