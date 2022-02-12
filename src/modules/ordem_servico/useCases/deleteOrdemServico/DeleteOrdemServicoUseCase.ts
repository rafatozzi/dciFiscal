import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServicoObsRepositories } from "../../infra/typeorm/repositories/OrdemServicoObsRepositories";
import { OrdemServicoPgtosRepositories } from "../../infra/typeorm/repositories/OrdemServicoPgtosRepositories";
import { OrdemServicoProdutosRepositories } from "../../infra/typeorm/repositories/OrdemServicoProdutosRepositories";
import { OrdemServicoRepositories } from "../../infra/typeorm/repositories/OrdemServicoRepositories";
import { OrdemServicoServicosRepositories } from "../../infra/typeorm/repositories/OrdemServicoServicosRepositories";

@injectable()
export class DeleteOrdemServicoUseCase {
  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new OrdemServicoRepositories(cod_cliente);
    const obsRepositories = new OrdemServicoObsRepositories(cod_cliente);
    const pgtosRepositories = new OrdemServicoPgtosRepositories(cod_cliente);
    const produtosRepositories = new OrdemServicoProdutosRepositories(cod_cliente);
    const servicosRepositories = new OrdemServicoServicosRepositories(cod_cliente);

    const ordemServico = await repositories.findById(id);

    if (!ordemServico)
      throw new AppError("Ordem de Serviço não encontrada");

    const obs = await obsRepositories.findByOrdemServico(ordemServico.id);
    const pgtos = await pgtosRepositories.findByOrdemServico(ordemServico.id);
    const produtos = await produtosRepositories.findByOrdemServico(ordemServico.id);
    const servicos = await servicosRepositories.findByOrdemServico(ordemServico.id);

    obs.map(async (item) => { await obsRepositories.deleteById(item.id); });
    pgtos.map(async (item) => { await pgtosRepositories.deleteById(item.id); });
    produtos.map(async (item) => { await produtosRepositories.deleteById(item.id); });
    servicos.map(async (item) => { await servicosRepositories.deleteById(item.id); });

    await repositories.deleteById(ordemServico.id);
  }
}