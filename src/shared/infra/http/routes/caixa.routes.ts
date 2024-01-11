import { Router } from "express";

import { CreateCaixaController } from "../../../../modules/caixa/useCases/createCaixa/CreateCaixaController";
import { FindAllCaixaController } from "../../../../modules/caixa/useCases/findAllCaixa/FindAllCaixaController";
import { FindCaixaByIdController } from "../../../../modules/caixa/useCases/findCaixaById/FindCaixaByIdController";
import { GetCaixaAbertaController } from "../../../../modules/caixa/useCases/getCaixaAberta/GetCaixaAbertaController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";


const createCaixaController = new CreateCaixaController();
const findAllCaixaController = new FindAllCaixaController();
const findCaixaByIdController = new FindCaixaByIdController();
const getCaixaAbertaController = new GetCaixaAbertaController();

const caixaRoutes = Router();

caixaRoutes.get("/", EnsureAuthenticated, findAllCaixaController.handle);
caixaRoutes.post("/findAll", EnsureAuthenticated, findAllCaixaController.handle);

caixaRoutes.get("/getCaixaAberto", EnsureAuthenticated, getCaixaAbertaController.handle);

caixaRoutes.get("/:id", EnsureAuthenticated, findCaixaByIdController.handle);

caixaRoutes.post("/", EnsureAuthenticated, createCaixaController.handle);

export { caixaRoutes };