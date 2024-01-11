import { ICreateNfePgtosDTO } from "../dtos/ICreateNfePgtosDTO";
import { NfePgtos } from "../infra/typeorm/entities/NfePgtos";

export interface INfePgtosRepositories {
  create(data: ICreateNfePgtosDTO[]): Promise<void>;
  findById(id: string): Promise<NfePgtos>;
  findByPedido(id: string): Promise<NfePgtos[]>;
  deleteNfePgtos(id: string): Promise<void>;
}