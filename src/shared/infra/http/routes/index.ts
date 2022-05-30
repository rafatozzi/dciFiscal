import { Router } from "express";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ufRouter } from "./uf.routes";
import { cidadesRouter } from "./cidades.routes";
import { empresaRoutes } from "./empresa.routes";
import { variantesRoutes } from "./variantes.routes";
import { produtosRoutes } from "./produtos.routes";
import { clientesRoutes } from "./clientes.routes";
import { pedidosRoutes } from "./pedidos.routes";
import { nfeRoutes } from "./nfe.routes";
import { histEnvioContabilRoutes } from "./hist_envio_contabil.routes";
import { servicosRoutes } from "./servicos.routes";
import { statusRoutes } from "./status.routes";
import { formaPgtoRoutes } from "./forma_pgto.routes";
import { ordemServicoRouter } from "./ordem_servico.routes";
import { agendamentoRoutes } from "./agendamento.routes";
import { caixaRoutes } from "./caixa.routes";
import { financeiroRoutes } from "./financeiro.routes";
import { relatoriosRoutes } from "./relatorios.routes";
import { aliquotasRoutes } from "./ncmAliquotas.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/uf", ufRouter);
router.use("/cidades", cidadesRouter);
router.use("/empresas", empresaRoutes);
router.use("/variantes", variantesRoutes);
router.use("/produtos", produtosRoutes);
router.use("/clientes", clientesRoutes);
router.use("/pedidos", pedidosRoutes);
router.use("/nfe", nfeRoutes);
router.use("/envio_contabil", histEnvioContabilRoutes);
router.use("/servicos", servicosRoutes);
router.use("/status", statusRoutes);
router.use("/formaPgto", formaPgtoRoutes);
router.use("/ordemServico", ordemServicoRouter);
router.use("/agendamento", agendamentoRoutes);
router.use("/caixa", caixaRoutes);
router.use("/financeiro", financeiroRoutes);
router.use("/relatorios", relatoriosRoutes);
router.use("/ncm_aliquota", aliquotasRoutes);

router.use(authenticateRoutes);

export { router };