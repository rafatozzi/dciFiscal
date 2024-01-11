import { injectable } from "tsyringe";
import { IFiltersCaixaDTO } from "../../dtos/IFiltersCaixaDTO";
import { IListCaixaDTO } from "../../dtos/IListCaixaDTO";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";

@injectable()
export class FindAllCaixaUseCase {
  constructor() { }

  async execute(cod_cliente: string, pesquisa?: IFiltersCaixaDTO, limit?: number, cursor?: number): Promise<IListCaixaDTO> {
    const repositories = new CaixaRepositories(cod_cliente);

    const result = await repositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}