import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateClienteController } from "../../../../modules/clientes/useCases/createCliente/CreateClienteController";
import { DeleteClienteController } from "../../../../modules/clientes/useCases/deleteCliente/DeleteClienteController";
import { FindAllClientesController } from "../../../../modules/clientes/useCases/findAllClientes/FindAllClientesController";
import { FindClienteByIdController } from "../../../../modules/clientes/useCases/findClienteById/FindClienteByIdController";

const createCliente = new CreateClienteController();
const deleteCliente = new DeleteClienteController();
const findAllClientes = new FindAllClientesController();
const findClienteById = new FindClienteByIdController();

const clientesRoutes = Router();

clientesRoutes.get("/", EnsureAuthenticated, findAllClientes.handle);
clientesRoutes.get("/:id", EnsureAuthenticated, findClienteById.handle);

clientesRoutes.post("/", EnsureAuthenticated, createCliente.handle);

clientesRoutes.delete("/", EnsureAuthenticated, deleteCliente.handle);

export { clientesRoutes };