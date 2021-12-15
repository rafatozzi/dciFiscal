import { ICreateEmpresasDTO } from "../dtos/ICreateEmpresasDTO";
import { Empresas } from "../infra/typeorm/entities/Empresas";

export interface IEmpresasRepositories {
  create(data: ICreateEmpresasDTO): Promise<Empresas>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<Empresas[]>;
  findById(id: string): Promise<Empresas>;
  deleteById(id: string): Promise<void>;
}