import { Router } from "express";
import { CreatePedidoController } from "../../../../modules/pedidos/useCases/createPedido/CreatePedidoController";
import { CreatePedidoPgtosController } from "../../../../modules/pedidos/useCases/createPedidoPgtos/CreatePedidoPgtosController";
import { CreatePedidoProdutosController } from "../../../../modules/pedidos/useCases/createPedidoProdutos/CreatePedidoProdutosController";
import { DeletePedidoController } from "../../../../modules/pedidos/useCases/deletePedido/DeletePedidoController";
import { DeletePedidoPgtosController } from "../../../../modules/pedidos/useCases/deletePedidoPgtos/DeletePedidoPgtosController";
import { DeletePedidoProdutosController } from "../../../../modules/pedidos/useCases/deletePedidoProdutos/DeletePedidoProdutosController";
import { FindAllPedidosController } from "../../../../modules/pedidos/useCases/findAllPedidos/FindAllPedidosController";
import { FindByIdPedidoController } from "../../../../modules/pedidos/useCases/findByIdPedido/FindByIdPedidoController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createPedido = new CreatePedidoController();
const createPedidoPgtos = new CreatePedidoPgtosController();
const createPedidoProdutos = new CreatePedidoProdutosController();
const deletePedido = new DeletePedidoController();
const deletePedidoPgtos = new DeletePedidoPgtosController();
const deletePedidoProdutos = new DeletePedidoProdutosController();
const findAllPedidos = new FindAllPedidosController();
const findByIdPedido = new FindByIdPedidoController();

const pedidosRoutes = Router();

pedidosRoutes.get("/", EnsureAuthenticated, findAllPedidos.handle);
pedidosRoutes.post("/findAll", EnsureAuthenticated, findAllPedidos.handle);
pedidosRoutes.get("/:id", EnsureAuthenticated, findByIdPedido.handle);

pedidosRoutes.post("/", EnsureAuthenticated, createPedido.handle);
pedidosRoutes.post("/pgtos", EnsureAuthenticated, createPedidoPgtos.handle);
pedidosRoutes.post("/produtos", EnsureAuthenticated, createPedidoProdutos.handle);

pedidosRoutes.delete("/", EnsureAuthenticated, deletePedido.handle);
pedidosRoutes.delete("/pgtos", EnsureAuthenticated, deletePedidoPgtos.handle);
pedidosRoutes.delete("/produtos", EnsureAuthenticated, deletePedidoProdutos.handle);

export { pedidosRoutes };