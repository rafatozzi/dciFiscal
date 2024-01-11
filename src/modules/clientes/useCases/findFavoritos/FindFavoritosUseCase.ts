import { injectable } from "tsyringe";
import { IListClientesResponse } from "../../dtos/IListClientesResponse";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";

@injectable()
export class FindFavoritosUseCase {
  constructor() { }

  async execute(cod_cliente: string): Promise<IListClientesResponse> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const result = await clientesRepositories.findFavoritos();

    return result;
  }
}