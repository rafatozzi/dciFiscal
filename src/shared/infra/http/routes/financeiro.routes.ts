import { Router } from "express";

import { CreateFinanceiroController } from "../../../../modules/financeiro/useCases/createFinanceiro/CreateFinanceiroController";
import { DeleteFinanceiroController } from "../../../../modules/financeiro/useCases/deleteFinanceiro/DeleteFinanceiroController";
import { FindAllFinanceiroController } from "../../../../modules/financeiro/useCases/findAllFinanceiro/FindAllFinanceiroController";
import { FindFinanceiroByIdController } from "../../../../modules/financeiro/useCases/findFinanceiroById/FindFinanceiroByIdController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createFinanceiroController = new CreateFinanceiroController();
const deleteFinanceiroController = new DeleteFinanceiroController();
const findAllFinanceiroController = new FindAllFinanceiroController();
const findFinanceiroByIdController = new FindFinanceiroByIdController();

const financeiroRoutes = Router();

financeiroRoutes.get("/", EnsureAuthenticated, findAllFinanceiroController.handle);
financeiroRoutes.post("/findAll", EnsureAuthenticated, findAllFinanceiroController.handle);

financeiroRoutes.get("/:id", EnsureAuthenticated, findFinanceiroByIdController.handle);

financeiroRoutes.post("/", EnsureAuthenticated, createFinanceiroController.handle);

financeiroRoutes.delete("/", EnsureAuthenticated, deleteFinanceiroController.handle);

export { financeiroRoutes };