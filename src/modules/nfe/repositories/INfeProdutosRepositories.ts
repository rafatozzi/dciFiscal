import { ICreateNfeProdutosDTO } from "../dtos/ICreateNfeProdutosDTO";
import { NfeProdutos } from "../infra/typeorm/entities/NfeProdutos";

export interface INfeProdutosRepositories {
  create(data: ICreateNfeProdutosDTO[]): Promise<void>;
  findById(id: string): Promise<NfeProdutos>;
  findByPedido(id: string): Promise<NfeProdutos[]>;
  deleteNfeProdutos(id: string): Promise<void>;
}