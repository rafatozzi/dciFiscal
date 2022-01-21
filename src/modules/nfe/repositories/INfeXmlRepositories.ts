import { ICreateNfeXmlDTO } from "../dtos/ICreateNfeXmlDTO";
import { NfeXml } from "../infra/typeorm/entities/NfeXml";

export interface INfeXmlRepositories {
  create(data: ICreateNfeXmlDTO): Promise<void>;
  findById(id: string): Promise<NfeXml>;
  findByNfe(id: string): Promise<NfeXml[]>;
  deleteNfePgtos(id: string): Promise<void>;
}