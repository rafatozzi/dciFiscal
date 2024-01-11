import { getRepository, Repository } from "typeorm";
import { ICreateFormaPgtoBandDTO } from "../../../dtos/ICreateFormaPgtoBandDTO";
import { IFormaPgtoBandRepositories } from "../../../repositories/IFormaPgtoBandRepositories";
import { FormaPgtoBand } from "../entities/FormaPgtoBand";

export class FormaPgtoBandRepositories implements IFormaPgtoBandRepositories {
  private repository: Repository<FormaPgtoBand>;

  constructor(connectionName: string) {
    this.repository = getRepository(FormaPgtoBand, connectionName);
  }

  async create(data: ICreateFormaPgtoBandDTO[]): Promise<void> {
    data.map(async (item) => {
      const bandeira = this.repository.create({ ...item });

      await this.repository.save(bandeira);
    });
  }

  async findById(id: string): Promise<FormaPgtoBand> {
    return await this.repository.findOne(id);
  }

  async findByFormaPgto(id: string): Promise<FormaPgtoBand[]> {
    return await this.repository.find({ id_forma_pgto: id, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const bandeira = await this.repository.findOne(id);

    bandeira.excluir = true;

    await this.repository.save(bandeira);
  }
}