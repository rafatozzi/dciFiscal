import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateOrdemServicoStatusDTO } from "../../dtos/ICreateOrdemServicoStatusDTO";
import { OrdemServicoStatusRepositories } from "../../infra/typeorm/repositories/OrdemServicoStatusRepositories";

@injectable()
export class CreateOrdemServicoStatusUseCase {
  async execute(cod_cliente: string, data: ICreateOrdemServicoStatusDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_ordem_servico && data[0].id_ordem_servico.length <= 0)
      throw new AppError("Ordem de Serviço não informada")

    const repositories = new OrdemServicoStatusRepositories(cod_cliente);

    await repositories.create(data);
  }
}