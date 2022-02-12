import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoServicosDTO } from "../../dtos/ICreateOrdemServicoServicosDTO";
import { OrdemServicoServicosRepositories } from "../../infra/typeorm/repositories/OrdemServicoServicosRepositories";

@injectable()
export class CreateOrdemServicoServicoUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoServicosDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_ordem_servico && data[0].id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoServicosRepositories(cod_cliente);

    await repositories.create(data);
  }
}