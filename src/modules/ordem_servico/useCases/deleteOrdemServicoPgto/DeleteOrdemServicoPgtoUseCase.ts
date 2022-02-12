import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServicoPgtosRepositories } from "../../infra/typeorm/repositories/OrdemServicoPgtosRepositories";

@injectable()
export class DeleteOrdemServicoPgtoUseCase {
  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new OrdemServicoPgtosRepositories(cod_cliente);

    const pgto = await repositories.findById(id);

    if (!pgto)
      throw new AppError("Cadastro não encontrado");

    await repositories.deleteById(id);
  }
}