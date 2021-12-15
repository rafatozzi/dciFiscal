import { Uf } from "../infra/typeorm/entities/Uf";

export interface IUfRepositories {
  findById(id: number): Promise<Uf>;
  findAll(): Promise<Uf[]>;
}