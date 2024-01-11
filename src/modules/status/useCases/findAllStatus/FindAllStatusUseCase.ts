import { injectable } from "tsyringe";
import { IListStatusDTO } from "../../dtos/IListStatusDTO";
import { StatusRepositories } from "../../infra/typeorm/repositories/StatusRepositories";

@injectable()
export class FindAllStatusUseCase {

  constructor() { }

  async execute(cod_cliente: string, pesquisa?: string): Promise<IListStatusDTO> {
    const repositories = new StatusRepositories(cod_cliente);
    const result = await repositories.findAll(pesquisa);

    return result;
  }

}