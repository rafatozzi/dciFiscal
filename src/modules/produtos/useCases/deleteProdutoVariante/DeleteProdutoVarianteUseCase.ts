import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProdutosVariantesRepositories } from "../../repositories/IProdutosVariantesRepositories";

@injectable()
export class DeleteProdutoVarianteUseCase {

  constructor(
    @inject("ProdutosVariantesRepositories")
    private produtosVariantesRepositories: IProdutosVariantesRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const prodVariante = await this.produtosVariantesRepositories.findById(id);

    if (!prodVariante)
      throw new AppError("Variante do produto não encontrado");

    await this.produtosVariantesRepositories.deleteById(id);
  }

}