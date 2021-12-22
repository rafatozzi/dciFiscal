import { Router } from "express";

import { CreateProdutosController } from "../../../../modules/produtos/useCases/createProdutos/CreateProdutosController";
import { CreateProdutoVarianteController } from "../../../../modules/produtos/useCases/createProdutoVariante/CreateProdutoVarianteController";
import { DeleteProdutoController } from "../../../../modules/produtos/useCases/deleteProduto/DeleteProdutoController";
import { DeleteProdutoVarianteController } from "../../../../modules/produtos/useCases/deleteProdutoVariante/DeleteProdutoVarianteController";
import { FindAllProdutosController } from "../../../../modules/produtos/useCases/findAllProdutos/FindAllProdutosController";
import { FindProdutoByCodBarController } from "../../../../modules/produtos/useCases/findProdutoByCodBar/FindProdutoByCodBarController";
import { FindProdutoByIdController } from "../../../../modules/produtos/useCases/findProdutoById/FindProdutoByIdController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createProdutos = new CreateProdutosController();
const createProdutoVariante = new CreateProdutoVarianteController();
const deleteProduto = new DeleteProdutoController();
const deleteProdutoVariante = new DeleteProdutoVarianteController();
const findAllProdutos = new FindAllProdutosController();
const findProdutoByCodBar = new FindProdutoByCodBarController();
const findProdutoById = new FindProdutoByIdController();

const produtosRoutes = Router();

produtosRoutes.get("/", EnsureAuthenticated, findAllProdutos.handle);
produtosRoutes.post("/findAll", EnsureAuthenticated, findAllProdutos.handle);

produtosRoutes.get("/:id", EnsureAuthenticated, findProdutoById.handle);
produtosRoutes.get("/codBar", EnsureAuthenticated, findProdutoByCodBar.handle);

produtosRoutes.post("/", EnsureAuthenticated, createProdutos.handle);
produtosRoutes.post("/variantes", EnsureAuthenticated, createProdutoVariante.handle);

produtosRoutes.delete("/", EnsureAuthenticated, deleteProduto.handle);
produtosRoutes.delete("/variantes", EnsureAuthenticated, deleteProdutoVariante.handle);

export { produtosRoutes };