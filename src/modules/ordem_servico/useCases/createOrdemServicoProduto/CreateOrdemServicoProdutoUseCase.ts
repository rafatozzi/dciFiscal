import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoProdutosDTO } from "../../dtos/ICreateOrdemServicoProdutosDTO";
import { OrdemServicoProdutosRepositories } from "../../infra/typeorm/repositories/OrdemServicoProdutosRepositories";

@injectable()
export class CreateOrdemServicoProdutoUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoProdutosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_ordem_servico && data[0].id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoProdutosRepositories(cod_cliente);

    await repositories.create(data);
  }
}