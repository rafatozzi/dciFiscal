import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServicoServicosRepositories } from "../../infra/typeorm/repositories/OrdemServicoServicosRepositories";

@injectable()
export class DeleteOrdemServicoServicoUseCase {
  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new OrdemServicoServicosRepositories(cod_cliente);

    const servico = await repositories.findById(id);

    if (!servico)
      throw new AppError("Cadsatro não encontrado");

    await repositories.deleteById(id);

  }
}