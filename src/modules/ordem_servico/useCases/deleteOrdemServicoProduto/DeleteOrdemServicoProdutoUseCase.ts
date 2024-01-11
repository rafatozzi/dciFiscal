import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { OrdemServicoProdutosRepositories } from "../../infra/typeorm/repositories/OrdemServicoProdutosRepositories";

@injectable()
export class DeleteOrdemServicoProdutoUseCase {
  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new OrdemServicoProdutosRepositories(cod_cliente);

    const produto = await repositories.findById(id);

    if (!produto)
      throw new AppError("Cadastro não encontrado");

    await repositories.deleteById(id);
  }
}