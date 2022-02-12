import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServico } from "../../infra/typeorm/entities/OrdemServico";
import { OrdemServicoRepositories } from "../../infra/typeorm/repositories/OrdemServicoRepositories";

@injectable()
export class FindOrdemServicoByIdUseCase {
  async execute(cod_cliente: string, id: string): Promise<OrdemServico> {
    const repositories = new OrdemServicoRepositories(cod_cliente);

    const result = await repositories.findById(id);

    if (!result)
      throw new AppError("Ordem de Serviço não encontrada");

    return result;
  }
}