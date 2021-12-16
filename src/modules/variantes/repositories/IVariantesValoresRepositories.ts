import { ICreateVariantesValoresDTO } from "../dtos/ICreateVariantesValoresDTO";
import { VariantesValores } from "../infra/typeorm/entities/VariantesValores";

export interface IVariantesValoresRepositories {
  create(data: ICreateVariantesValoresDTO[]): Promise<void>;
  findById(id: string): Promise<VariantesValores>;
  findByVariante(id_variante: string): Promise<VariantesValores[]>;
  deleteById(id: string): Promise<void>;
}