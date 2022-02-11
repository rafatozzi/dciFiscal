import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoPgtosDTO } from "../../dtos/ICreateOrdemServicoPgtosDTO";
import { OrdemServicoPgtosRepositories } from "../../infra/typeorm/repositories/OrdemServicoPgtosRepositories";

export class CreateOrdemServicoPgtoUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoPgtosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_ordem_servico && data[0].id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoPgtosRepositories(cod_cliente);

    await repositories.create(data);
  }
}