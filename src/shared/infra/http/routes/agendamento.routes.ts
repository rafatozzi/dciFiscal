import { Router } from "express";

import { CreateAgendamentoController } from "../../../../modules/agendamento/useCases/createAgendamento/CreateAgendamentoController";
import { DeleteAgendamentoController } from "../../../../modules/agendamento/useCases/deleteAgendamento/DeleteAgendamentoController"
import { FindAgendamentoByIdController } from "../../../../modules/agendamento/useCases/findAgendamentoById/FindAgendamentoByIdController"
import { FindAllAgendamentosController } from "../../../../modules/agendamento/useCases/findAllAgendamentos/FindAllAgendamentosController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createAgendamentoController = new CreateAgendamentoController();
const deleteAgendamentoController = new DeleteAgendamentoController();
const findAgendamentoByIdController = new FindAgendamentoByIdController();
const findAllAgendamentosController = new FindAllAgendamentosController();

const agendamentoRoutes = Router();

agendamentoRoutes.get("/", EnsureAuthenticated, findAllAgendamentosController.handle);
agendamentoRoutes.post("/findAll", EnsureAuthenticated, findAllAgendamentosController.handle);

agendamentoRoutes.get("/:id", EnsureAuthenticated, findAgendamentoByIdController.handle);

agendamentoRoutes.post("/", EnsureAuthenticated, createAgendamentoController.handle);

agendamentoRoutes.delete("/", EnsureAuthenticated, deleteAgendamentoController.handle);

export { agendamentoRoutes };