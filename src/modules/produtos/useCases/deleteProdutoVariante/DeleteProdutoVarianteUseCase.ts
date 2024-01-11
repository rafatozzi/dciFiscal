import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ProdutosVariantesRepositories } from "../../infra/typeorm/repositories/ProdutosVariantesRepositories";

@injectable()
export class DeleteProdutoVarianteUseCase {

  constructor(
    // @inject("ProdutosVariantesRepositories")
    // private produtosVariantesRepositories: IProdutosVariantesRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const produtosVariantesRepositories = new ProdutosVariantesRepositories(cod_cliente);
    const prodVariante = await produtosVariantesRepositories.findById(id);

    if (!prodVariante)
      throw new AppError("Variante do produto não encontrado");

    await produtosVariantesRepositories.deleteById(id);
  }

}