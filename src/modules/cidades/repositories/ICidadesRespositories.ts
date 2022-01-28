import { Cidades } from "../infra/typeorm/entities/Cidades";

export interface ICidadesRespositories {
  findById(id: number): Promise<Cidades>;
  findByIbge(id: number): Promise<Cidades>;
  findByUf(uf: number): Promise<Cidades[]>;
  findAll(): Promise<Cidades[]>;
}