import { injectable } from "tsyringe";
import { IListServicosDTO } from "../../dtos/IListServicosDTO";
import { ServicosRepositories } from "../../infra/typeorm/repositories/ServicosRepositories";

@injectable()
export class FindAllServicosUseCase {

  constructor() { }

  async execute(cod_cliente: string, pesquisa?: string, limit?: number, cursor?: number): Promise<IListServicosDTO> {
    const repositories = new ServicosRepositories(cod_cliente);
    const result = await repositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}