import { injectable } from "tsyringe";
import { IListServicosDTO } from "../../dtos/IListServicosDTO";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class FindFavoritosUseCase {
  constructor() { }

  async execute(cod_cliente: string): Promise<IListServicosDTO> {
    const produtosRepositories = new ServicosRepositories(cod_cliente);
    const result = await produtosRepositories.findFavoritos();

    return result;
  }
}