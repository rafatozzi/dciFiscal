import { getRepository, Like, Repository } from "typeorm";
import { ICreateStatusDTO } from "../../../dtos/ICreateStatusDTO";
import { IListStatusDTO } from "../../../dtos/IListStatusDTO";
import { IStatusRepositories } from "../../../repositories/IStatusRepositories";
import { Status } from "../entities/Status";

export class StatusRepositories implements IStatusRepositories {
  private repository: Repository<Status>;

  constructor(connectionName: string) {
    this.repository = getRepository(Status, connectionName);
  }

  async create(data: ICreateStatusDTO): Promise<Status> {
    const status = this.repository.create({ ...data });

    await this.repository.save(status);

    return status;
  }

  async findAll(pesquisa?: string): Promise<IListStatusDTO> {

    const where =
      pesquisa && pesquisa.length > 0 ?
        { nome: Like(`%${pesquisa}%`), excluir: false }
        :
        { excluir: false };

    const [result, total] = await this.repository.findAndCount({
      where,
      order: { ordem: "ASC", nome: "ASC" }
    });

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<Status> {
    return await this.repository.findOne(id);
  }

  async findByName(nome: string): Promise<Status> {
    return await this.repository.findOne({ nome, excluir: false });
  }

  async deleteStatus(id: string): Promise<void> {
    const status = await this.repository.findOne(id);

    status.excluir = true;

    await this.repository.save(status);
  }
}