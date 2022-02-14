import { Router } from "express";

import { CreateServicosController } from "../../../../modules/servicos/useCases/createServicos/CreateServicosController";
import { CreateServicosCheckListController } from "../../../../modules/servicos/useCases/createServicosCheckList/CreateServicosCheckListController";
import { CreateServicosComissaoController } from "../../../../modules/servicos/useCases/createServicosComissao/CreateServicosComissaoController";
import { DeleteServicosController } from "../../../../modules/servicos/useCases/deleteServicos/DeleteServicosController";
import { DeleteServicosCheckListController } from "../../../../modules/servicos/useCases/deleteServicosCheckList/DeleteServicosCheckListController";
import { DeleteServicosComissaoController } from "../../../../modules/servicos/useCases/deleteServicosComissa/DeleteServicosComissaController";
import { FindAllServicosController } from "../../../../modules/servicos/useCases/findAllServicos/FindAllServicosController";
import { FindServicoByIdController } from "../../../../modules/servicos/useCases/findServicoById/FindServicoByIdController";
import { FindFavoritosController } from "../../../../modules/servicos/useCases/findFavoritos/FindFavoritosController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";


const createServicosController = new CreateServicosController();
const createServicosCheckListController = new CreateServicosCheckListController();
const createServicosComissaoController = new CreateServicosComissaoController();
const deleteServicosController = new DeleteServicosController();
const deleteServicosCheckListController = new DeleteServicosCheckListController();
const deleteServicosComissaoController = new DeleteServicosComissaoController();
const findAllServicosController = new FindAllServicosController();
const findServicoByIdController = new FindServicoByIdController();
const findFavoritos = new FindFavoritosController();

const servicosRoutes = Router();

servicosRoutes.get("/", EnsureAuthenticated, findAllServicosController.handle);
servicosRoutes.post("/findAll", EnsureAuthenticated, findAllServicosController.handle);
servicosRoutes.get("/favoritos", EnsureAuthenticated, findFavoritos.handle);

servicosRoutes.get("/:id", EnsureAuthenticated, findServicoByIdController.handle);

servicosRoutes.post("/", EnsureAuthenticated, createServicosController.handle);
servicosRoutes.post("/checklist", EnsureAuthenticated, createServicosCheckListController.handle);
servicosRoutes.post("/comissao", EnsureAuthenticated, createServicosComissaoController.handle);

servicosRoutes.delete("/", EnsureAuthenticated, deleteServicosController.handle);
servicosRoutes.delete("/checklist", EnsureAuthenticated, deleteServicosCheckListController.handle);
servicosRoutes.delete("/comissao", EnsureAuthenticated, deleteServicosComissaoController.handle);

export { servicosRoutes };