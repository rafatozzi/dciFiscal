import { injectable } from "tsyringe";
import { IFiltersFinanceiroDTO } from "../../dtos/IFiltersFinanceiroDTO";
import { IListFinanceiroDTO } from "../../dtos/IListFinanceiroDTO";
import { FinanceiroRepositories } from "../../infra/typeorm/repositories/FinanceiroRepositories";

@injectable()
export class FindAllFinanceiroUseCase {
  constructor() { }

  async execute(cod_cliente: string, pesquisa?: IFiltersFinanceiroDTO, limit?: number, cursor?: number): Promise<IListFinanceiroDTO> {
    const repositories = new FinanceiroRepositories(cod_cliente);

    const result = await repositories.findAll(pesquisa, limit, cursor);

    return result;
  }
}