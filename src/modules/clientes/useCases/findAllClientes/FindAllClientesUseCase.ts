import { injectable } from "tsyringe";
import { IListClientesResponse } from "../../dtos/IListClientesResponse";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";

@injectable()
export class FindAllClientesUseCase {

  constructor(
    // @inject("ClientesRepositories")
    // private clientesRepositories: IClientesRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: string, limit?: number, cursor?: number): Promise<IListClientesResponse> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const result = await clientesRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}