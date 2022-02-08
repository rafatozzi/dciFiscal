import { ICreateFormaPgtoBandTaxasDTO } from "../dtos/ICreateFormaPgtoBandTaxasDTO";
import { FormaPgtoBandTaxas } from "../infra/typeorm/entities/FormaPgtoBandTaxas";

export interface IFormaPgtoBandTaxasRepositories {
  create(data: ICreateFormaPgtoBandTaxasDTO[]): Promise<void>;
  findById(id: string): Promise<FormaPgtoBandTaxas>;
  findByFormaPgtoBand(id: string): Promise<FormaPgtoBandTaxas[]>;
  deleteById(id: string): Promise<void>;
}