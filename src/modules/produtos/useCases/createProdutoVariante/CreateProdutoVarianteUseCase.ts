import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProdutosVariantesDTO } from "../../dtos/ICreateProdutosVariantesDTO";
import { IProdutosVariantesRepositories } from "../../repositories/IProdutosVariantesRepositories";

@injectable()
export class CreateProdutoVarianteUseCase {

  constructor(
    @inject("ProdutosVariantesRepositories")
    private produtosVariantesRepositories: IProdutosVariantesRepositories
  ) { }

  async execute(data: ICreateProdutosVariantesDTO[]): Promise<void> {
    if (data.length <= 0)
      return;

    if (!data[0].id_produtos && data[0].id_produtos.length <= 0)
      throw new AppError("Produto não informado")

    const valoresExists = await this.produtosVariantesRepositories.findByProduto(data[0].id_produtos);

    const newData = data.map((item) => {
      if (!item.id) {
        const alreadyExists = valoresExists.find(i => i.id_variante === item.id_variante && i.id_variante_valores === item.id_variante_valores)

        if (!alreadyExists && item.id_produtos && item.id_produtos.length > 0)
          return item;
      }
      else
        return item;
    })

    await this.produtosVariantesRepositories.create(newData);
  }

}