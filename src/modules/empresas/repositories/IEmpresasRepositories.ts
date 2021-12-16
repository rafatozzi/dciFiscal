import { ICreateEmpresasDTO } from "../dtos/ICreateEmpresasDTO";
import { IListResponse } from "../dtos/IListResponse";
import { Empresas } from "../infra/typeorm/entities/Empresas";

export interface IEmpresasRepositories {
  create(data: ICreateEmpresasDTO): Promise<Empresas>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListResponse>;
  findById(id: string): Promise<Empresas>;
  findByCNPJ(cnpj: number): Promise<Empresas>;
  deleteById(id: string): Promise<void>;
}