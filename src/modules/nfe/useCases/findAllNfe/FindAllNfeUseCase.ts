import { injectable } from "tsyringe";
import { IFiltersNfeDTO } from "../../dtos/IFiltersNfeDTO";
import { IListNfeDTO } from "../../dtos/IListNfeDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class FindAllNfeUseCase {

  constructor(
    // @inject("NfeRepositories")
    // private nfeRepositories: INfeRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: IFiltersNfeDTO, limit?: number, cursor?: number): Promise<IListNfeDTO> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const result = await nfeRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}