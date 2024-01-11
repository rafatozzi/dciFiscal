import { Router } from "express";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateClienteController } from "../../../../modules/clientes/useCases/createCliente/CreateClienteController";
import { DeleteClienteController } from "../../../../modules/clientes/useCases/deleteCliente/DeleteClienteController";
import { FindAllClientesController } from "../../../../modules/clientes/useCases/findAllClientes/FindAllClientesController";
import { FindClienteByIdController } from "../../../../modules/clientes/useCases/findClienteById/FindClienteByIdController";
import { FindFavoritosController } from "../../../../modules/clientes/useCases/findFavoritos/FindFavoritosController";
import { FindClienteByCpfController } from "../../../../modules/clientes/useCases/findClienteByCpf/FindClienteByCpfController";

const createCliente = new CreateClienteController();
const deleteCliente = new DeleteClienteController();
const findAllClientes = new FindAllClientesController();
const findClienteById = new FindClienteByIdController();
const findFavoritos = new FindFavoritosController();
const findClienteByCpf = new FindClienteByCpfController();

const clientesRoutes = Router();

clientesRoutes.get("/", EnsureAuthenticated, findAllClientes.handle);
clientesRoutes.post("/findAll", EnsureAuthenticated, findAllClientes.handle);
clientesRoutes.get("/favoritos", EnsureAuthenticated, findFavoritos.handle);

clientesRoutes.get("/:id", EnsureAuthenticated, findClienteById.handle);
clientesRoutes.get("/cpf/:cpf", EnsureAuthenticated, findClienteByCpf.handle);

clientesRoutes.post("/", EnsureAuthenticated, createCliente.handle);

clientesRoutes.delete("/", EnsureAuthenticated, deleteCliente.handle);

export { clientesRoutes };