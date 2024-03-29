import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoObsDTO } from "../../dtos/ICreateOrdemServicoObsDTO";
import { OrdemServicoObsRepositories } from "../../infra/typeorm/repositories/OrdemServicoObsRepositories";

@injectable()
export class CreateOrdemServicoObsUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoObsDTO[], id_user: string): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_ordem_servico && data[0].id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoObsRepositories(cod_cliente);

    await repositories.create(data, id_user);
  }
}