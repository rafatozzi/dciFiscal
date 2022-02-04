import { getRepository, Repository } from "typeorm";
import { ICreateServicoCkeckListDTO } from "../../../dtos/ICreateServicoCkeckListDTO";
import { IServicosCkeckListRepositories } from "../../../repositories/IServicosCkeckListRepositories";
import { ServicosCkeckList } from "../entities/ServicosCkeckList";

export class ServicosCkeckListRepositories implements IServicosCkeckListRepositories {
  private repository: Repository<ServicosCkeckList>;

  constructor(connectionName: string) {
    this.repository = getRepository(ServicosCkeckList, connectionName);
  }

  async create(data: ICreateServicoCkeckListDTO[]): Promise<void> {
    data.map(async (item) => {
      const variante = this.repository.create({ ...item });

      await this.repository.save(variante);
    });
  }

  async findById(id: string): Promise<ServicosCkeckList> {
    return await this.repository.findOne(id);
  }

  async findByServico(id: string): Promise<ServicosCkeckList[]> {
    return await this.repository.find({ id_servico: id, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const checkList = await this.repository.findOne(id);

    checkList.excluir = true;

    await this.repository.save(checkList);
  }

}