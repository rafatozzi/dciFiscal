import { ICreateVarianteDTO } from "../dtos/ICreateVarianteDTO";
import { IListVariantesResponseDTO } from "../dtos/IListVariantesResponseDTO";
import { Variantes } from "../infra/typeorm/entities/Variantes";

export interface IVariantesRepositories {
  create(data: ICreateVarianteDTO): Promise<Variantes>;
  findById(id: string): Promise<Variantes>;
  findByNome(nome: string): Promise<Variantes>;
  findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListVariantesResponseDTO>;
  deleteVariante(id: string): Promise<void>;
}