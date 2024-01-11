import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServicoObsRepositories } from "../../infra/typeorm/repositories/OrdemServicoObsRepositories";

@injectable()
export class DeleteOrdemServicoObsUseCase {
  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new OrdemServicoObsRepositories(cod_cliente);

    const obs = await repositories.findById(id);

    if (!obs)
      throw new AppError("Cadastro não encontrado");

    await repositories.deleteById(id);
  }
}