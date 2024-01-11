import { ICreateFormaPgtoDTO } from "../dtos/ICreateFormaPgtoDTO";
import { IListFormaPgtosDTO } from "../dtos/IListFormaPgtosDTO";
import { FormaPgto } from "../infra/typeorm/entities/FormaPgto";

export interface IFormaPgtoRepositories {
  create(data: ICreateFormaPgtoDTO): Promise<FormaPgto>;
  findAll(pesquisa?: string): Promise<IListFormaPgtosDTO>;
  findById(id: string): Promise<FormaPgto>;
  findByNome(nome: string): Promise<FormaPgto>;
  deleteFormaPgto(id: string): Promise<void>;
}