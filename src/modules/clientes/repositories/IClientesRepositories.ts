import { ICreateClientesDTO } from "../dtos/ICreateClientesDTO";
import { IListClientesResponse } from "../dtos/IListClientesResponse";
import { Clientes } from "../infra/typeorm/entities/Clientes";

export interface IClientesRepositories {
  create(data: ICreateClientesDTO): Promise<Clientes>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListClientesResponse>;
  findById(id: string): Promise<Clientes>;
  findByCpfCnpj(cpf_cnpj: number): Promise<Clientes>;
  deleteById(id: string): Promise<void>;
}