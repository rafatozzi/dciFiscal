import { Router } from "express";

import { RelatorioFechamentoController } from "../../../../modules/caixa/useCases/relatorioFechamento/RelatorioFechamentoController";
import { RelatorioOrdemServicoController } from "../../../../modules/ordem_servico/useCases/relatorioOrdemServico/RelatorioOrdemServicoController";
import { RelatorioNfeController } from "../../../../modules/nfe/useCases/relatorioNfe/RelatorioNfeController";

import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const relatorioFechamentoController = new RelatorioFechamentoController();
const relatorioOrdemServicoController = new RelatorioOrdemServicoController();
const relatorioNfeController = new RelatorioNfeController();

const relatoriosRoutes = Router();

relatoriosRoutes.post("/fechamentoCaixa", EnsureAuthenticated, relatorioFechamentoController.handle);
relatoriosRoutes.post("/ordemServico", EnsureAuthenticated, relatorioOrdemServicoController.handle);
relatoriosRoutes.post("/nfe", EnsureAuthenticated, relatorioNfeController.handle);

export { relatoriosRoutes }