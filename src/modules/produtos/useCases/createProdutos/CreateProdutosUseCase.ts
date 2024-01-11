import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProdutosDTO } from "../../dtos/ICreateProdutosDTO";
import { Produtos } from "../../infra/typeorm/entities/Produtos";
import { ProdutosRepositories } from "../../infra/typeorm/repositories/ProdutosRepositories";


@injectable()
export class CreateProdutosUseCase {

  constructor(
    // @inject("ProdutosRepositories")
    // private produtosRepositories: IProdutosRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateProdutosDTO): Promise<Produtos> {
    const produtosRepositories = new ProdutosRepositories(cod_cliente);
    if (!data.id) {
      if (!data.cod_barras && data.cod_barras.length > 0) {
        const codBarExists = await produtosRepositories.findByCodBarras(data.cod_barras);

        if (codBarExists)
          throw new AppError("Código de barras já cadastrado");
      }

      const nomeExits = await produtosRepositories.findByNome(data.nome);

      if (nomeExits)
        throw new AppError("Nome do produto já cadastrado");
    }

    const produto = await produtosRepositories.create(data);

    return produto;
  }

}