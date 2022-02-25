import { Router } from "express";

import { RelatorioFechamentoController } from "../../../../modules/caixa/useCases/relatorioFechamento/RelatorioFechamentoController";
import { RelatorioOrdemServicoController } from "../../../../modules/ordem_servico/useCases/relatorioOrdemServico/RelatorioOrdemServicoController";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const relatorioFechamentoController = new RelatorioFechamentoController();
const relatorioOrdemServicoController = new RelatorioOrdemServicoController();

const relatoriosRoutes = Router();

relatoriosRoutes.post("/fechamentoCaixa", EnsureAuthenticated, relatorioFechamentoController.handle);
relatoriosRoutes.post("/ordemServico", EnsureAuthenticated, relatorioOrdemServicoController.handle);

export { relatoriosRoutes }