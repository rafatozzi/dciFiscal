import { Repository, getRepository } from "typeorm";
import { IUfRepositories } from "../../../repositories/IUfRepositories";
import { Uf } from "../entities/Uf";

export class UfRepositories implements IUfRepositories {
  private repository: Repository<Uf>;

  constructor(connectionName: string) {
    this.repository = getRepository(Uf, connectionName);
  }

  async findById(id: number): Promise<Uf> {
    const result = await this.repository.findOne(id);

    return result;
  }

  async findAll(): Promise<Uf[]> {
    const [result] = await this.repository.findAndCount({
      order: { nome: "ASC" }
    })

    return result;
  }

}