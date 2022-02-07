import { ICreateStatusDTO } from "../dtos/ICreateStatusDTO";
import { IListStatusDTO } from "../dtos/IListStatusDTO";
import { Status } from "../infra/typeorm/entities/Status";

export interface IStatusRepositories {
  create(data: ICreateStatusDTO): Promise<Status>;
  findAll(pesquisa?: string): Promise<IListStatusDTO>
  findById(id: string): Promise<Status>;
  findByName(name: string): Promise<Status>;
  deleteStatus(id: string): Promise<void>;
}