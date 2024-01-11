import { Router } from "express";

import { CreateOrdemServicoController } from "../../../../modules/ordem_servico/useCases/createOrdemServico/CreateOrdemServicoController";
import { CreateOrdemServicoObsController } from "../../../../modules/ordem_servico/useCases/createOrdemServicoObs/CreateOrdemServicoObsController";;
import { CreateOrdemServicoPgtoController } from "../../../../modules/ordem_servico/useCases/createOrdemServicoPgto/CreateOrdemServicoPgtoController";
import { CreateOrdemServicoProdutoController } from "../../../../modules/ordem_servico/useCases/createOrdemServicoProduto/CreateOrdemServicoProdutoController";
import { CreateOrdemServicoServicoController } from "../../../../modules/ordem_servico/useCases/createOrdemServicoServico/CreateOrdemServicoServicoController";
import { CreateOrdemServicoStatusController } from "../../../../modules/ordem_servico/useCases/createOrdemServicoStatus/CreateOrdemServicoStatusController";
import { DeleteOrdemServicoController } from "../../../../modules/ordem_servico/useCases/deleteOrdemServico/DeleteOrdemServicoController";
import { DeleteOrdemServicoObsController } from "../../../../modules/ordem_servico/useCases/deleteOrdemServicoObs/DeleteOrdemServicoObsController";
import { DeleteOrdemServicoPgtoController } from "../../../../modules/ordem_servico/useCases/deleteOrdemServicoPgto/DeleteOrdemServicoPgtoController";
import { DeleteOrdemServicoProdutoController } from "../../../../modules/ordem_servico/useCases/deleteOrdemServicoProduto/DeleteOrdemServicoProdutoController";
import { DeleteOrdemServicoServicoController } from "../../../../modules/ordem_servico/useCases/deleteOrdemServicoServico/DeleteOrdemServicoServicoController";
import { FindAllOrdemServicoController } from "../../../../modules/ordem_servico/useCases/findAllOrdemServico/FindAllOrdemServicoController";
import { FindOrdemServicoByIdController } from "../../../../modules/ordem_servico/useCases/findOrdemServicoById/FindOrdemServicoByIdController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";


const createOrdemServicoController = new CreateOrdemServicoController();
const createOrdemServicoObsController = new CreateOrdemServicoObsController();
const createOrdemServicoPgtoController = new CreateOrdemServicoPgtoController();
const createOrdemServicoProdutoController = new CreateOrdemServicoProdutoController();
const createOrdemServicoServicoController = new CreateOrdemServicoServicoController();
const createOrdemServicoStatusController = new CreateOrdemServicoStatusController();
const deleteOrdemServicoController = new DeleteOrdemServicoController();
const deleteOrdemServicoObsController = new DeleteOrdemServicoObsController();
const deleteOrdemServicoPgtoController = new DeleteOrdemServicoPgtoController();
const deleteOrdemServicoProdutoController = new DeleteOrdemServicoProdutoController();
const deleteOrdemServicoServicoController = new DeleteOrdemServicoServicoController();
const findAllOrdemServicoController = new FindAllOrdemServicoController();
const findOrdemServicoByIdController = new FindOrdemServicoByIdController();

const ordemServicoRouter = Router();

ordemServicoRouter.get("/", EnsureAuthenticated, findAllOrdemServicoController.handle);
ordemServicoRouter.post("/findAll", EnsureAuthenticated, findAllOrdemServicoController.handle);

ordemServicoRouter.get("/:id", EnsureAuthenticated, findOrdemServicoByIdController.handle);

ordemServicoRouter.post("/", EnsureAuthenticated, createOrdemServicoController.handle);
ordemServicoRouter.post("/obs", EnsureAuthenticated, createOrdemServicoObsController.handle);
ordemServicoRouter.post("/pgto", EnsureAuthenticated, createOrdemServicoPgtoController.handle);
ordemServicoRouter.post("/produto", EnsureAuthenticated, createOrdemServicoProdutoController.handle);
ordemServicoRouter.post("/servico", EnsureAuthenticated, createOrdemServicoServicoController.handle);
ordemServicoRouter.post("/status", EnsureAuthenticated, createOrdemServicoStatusController.handle);

ordemServicoRouter.delete("/", EnsureAuthenticated, deleteOrdemServicoController.handle);
ordemServicoRouter.delete("/obs", EnsureAuthenticated, deleteOrdemServicoObsController.handle);
ordemServicoRouter.delete("/pgto", EnsureAuthenticated, deleteOrdemServicoPgtoController.handle);
ordemServicoRouter.delete("/produto", EnsureAuthenticated, deleteOrdemServicoProdutoController.handle);
ordemServicoRouter.delete("/servico", EnsureAuthenticated, deleteOrdemServicoServicoController.handle);

export { ordemServicoRouter };