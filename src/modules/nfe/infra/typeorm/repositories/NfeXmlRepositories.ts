import { getRepository, Like, Repository } from "typeorm";
import { ICreateNfeXmlDTO } from "../../../dtos/ICreateNfeXmlDTO";
import { INfeXmlRepositories } from "../../../repositories/INfeXmlRepositories";
import { NfeXml } from "../entities/NfeXml";


export class NfeXmlRepositories implements INfeXmlRepositories {
  private repository: Repository<NfeXml>;

  constructor(connectionName: string) {
    this.repository = getRepository(NfeXml, connectionName);
  }

  async create(data: ICreateNfeXmlDTO): Promise<void> {
    const xml = this.repository.create({ ...data });

    await this.repository.save(xml);
  }

  async findById(id: string): Promise<NfeXml> {
    return await this.repository.findOne(id);
  }

  async findByNfe(id: string): Promise<NfeXml[]> {
    return await this.repository.find({ id_nfe: id });
  }

  async deleteNfePgtos(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findChave(chave: string): Promise<NfeXml> {
    return await this.repository.findOne({
      where: {
        xml: Like(`%${chave}%`),
        acao: "xml"
      }
    })
  }

  async forcaUpdate(id: string, idNfe: string): Promise<void> {
    const res = await this.repository.query(`UPDATE nfe_xml SET id_nfe="${idNfe}" WHERE id="${id}"`);
    console.log(res);
  }

}