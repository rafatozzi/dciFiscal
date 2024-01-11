import { ICreateCaixaDTO } from "../dtos/ICreateCaixaDTO";
import { IFiltersCaixaDTO } from "../dtos/IFiltersCaixaDTO";
import { IListCaixaDTO } from "../dtos/IListCaixaDTO";
import { Caixa } from "../infra/typeorm/entities/Caixa";

export interface ICaixaRepositories {
  create(data: ICreateCaixaDTO): Promise<Caixa>;
  findAll(pesquisa?: IFiltersCaixaDTO, limit?: number, cursor?: number): Promise<IListCaixaDTO>;
  findById(id: string): Promise<Caixa>;
  getCaixaAberto(): Promise<Caixa>;
}