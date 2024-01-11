import { ICreateFormaPgtoBandDTO } from "../dtos/ICreateFormaPgtoBandDTO";
import { FormaPgtoBand } from "../infra/typeorm/entities/FormaPgtoBand";

export interface IFormaPgtoBandRepositories {
  create(data: ICreateFormaPgtoBandDTO[]): Promise<void>;
  findById(id: string): Promise<FormaPgtoBand>;
  findByFormaPgto(id: string): Promise<FormaPgtoBand[]>;
  deleteById(id: string): Promise<void>;
}