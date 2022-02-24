import { Router } from "express";

import { RelatorioFechamentoController } from "../../../../modules/caixa/useCases/relatorioFechamento/RelatorioFechamentoController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const relatorioFechamentoController = new RelatorioFechamentoController();

const relatoriosRoutes = Router();

relatoriosRoutes.post("/fechamentoCaixa", EnsureAuthenticated, relatorioFechamentoController.handle);

export { relatoriosRoutes }