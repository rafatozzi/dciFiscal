import { ICreateServicoCkeckListDTO } from "../dtos/ICreateServicoCkeckListDTO";
import { ServicosCkeckList } from "../infra/typeorm/entities/ServicosCkeckList";

export interface IServicosCkeckListRepositories {
  create(data: ICreateServicoCkeckListDTO[]): Promise<void>;
  findById(id: string): Promise<ServicosCkeckList>;
  findByServico(id: string): Promise<ServicosCkeckList[]>;
  deleteById(id: string): Promise<void>;
}