import { ICreateNfeDTO } from "../dtos/ICreateNfeDTO";
import { IFiltersNfeDTO } from "../dtos/IFiltersNfeDTO";
import { IListNfeDTO } from "../dtos/IListNfeDTO";
import { Nfe } from "../infra/typeorm/entities/Nfe";

export interface INfeRepositories {
  create(data: ICreateNfeDTO): Promise<Nfe>;
  findAll(pesquisa?: IFiltersNfeDTO, limit?: number, cursor?: number): Promise<IListNfeDTO>
  findById(id: string): Promise<Nfe>;
  findByChave(chave: string): Promise<Nfe>;
  deletePedido(id: string): Promise<void>;
}