import { ICreateFinanceiroDTO } from "../dtos/ICreateFinanceiroDTO";
import { IFiltersFinanceiroDTO } from "../dtos/IFiltersFinanceiroDTO";
import { IListFinanceiroDTO } from "../dtos/IListFinanceiroDTO";
import { Financeiro } from "../infra/typeorm/entities/Financeiro";

export interface IFinanceiroRepositories {
  create(data: ICreateFinanceiroDTO): Promise<Financeiro>;
  findAll(pesquisa?: IFiltersFinanceiroDTO, limit?: number, cursor?: number): Promise<IListFinanceiroDTO>;
  findById(id: string): Promise<Financeiro>;
  deleteById(id: string): Promise<void>;
}