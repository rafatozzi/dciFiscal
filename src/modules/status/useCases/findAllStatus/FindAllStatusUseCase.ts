import { injectable } from "tsyringe";
import { IListStatusDTO } from "../../dtos/IListStatusDTO";
import { StatusRepositories } from "../../infra/typeorm/repositories/StatusRepositories";

@injectable()
export class FindAllStatusUseCase {

  constructor() { }

  async execute(cod_cliente: string): Promise<IListStatusDTO> {
    const repositories = new StatusRepositories(cod_cliente);
    const result = await repositories.findAll();

    return result;
  }

}