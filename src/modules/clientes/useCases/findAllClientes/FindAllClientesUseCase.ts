import { inject, injectable } from "tsyringe";
import { IListClientesResponse } from "../../dtos/IListClientesResponse";
import { IClientesRepositories } from "../../repositories/IClientesRepositories";

@injectable()
export class FindAllClientesUseCase {

  constructor(
    @inject("ClientesRepositories")
    private clientesRepositories: IClientesRepositories
  ) { }

  async execute(pesquisa?: string, limit?: number, cursor?: number): Promise<IListClientesResponse> {
    const result = await this.clientesRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}