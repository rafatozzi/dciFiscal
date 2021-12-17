import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProdutosDTO } from "../../dtos/ICreateProdutosDTO";
import { Produtos } from "../../infra/typeorm/entities/Produtos";
import { IProdutosRepositories } from "../../repositories/IProdutosRepositories";


@injectable()
export class CreateProdutosUseCase {

  constructor(
    @inject("ProdutosRepositories")
    private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(data: ICreateProdutosDTO): Promise<Produtos> {
    if (!data.id) {
      if (!data.cod_barras && data.cod_barras.length > 0) {
        const codBarExists = await this.produtosRepositories.findByCodBarras(data.cod_barras);

        if (codBarExists)
          throw new AppError("Código de barras já cadastrado");
      }

      const nomeExits = await this.produtosRepositories.findByNome(data.nome);

      if (nomeExits)
        throw new AppError("Nome do produto já cadastrado");
    }

    const produto = await this.produtosRepositories.create(data);

    return produto;
  }

}