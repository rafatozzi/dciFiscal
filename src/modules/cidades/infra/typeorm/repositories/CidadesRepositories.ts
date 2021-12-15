import { getRepository, Repository } from "typeorm";
import { ICidadesRespositories } from "../../../repositories/ICidadesRespositories";
import { Cidades } from "../entities/Cidades";

export class CidadesRepositories implements ICidadesRespositories {
  private repository: Repository<Cidades>;

  constructor() {
    this.repository = getRepository(Cidades);
  }

  async findById(id: number): Promise<Cidades> {
    return await this.repository.findOne(id);
  }

  async findByUf(uf: number): Promise<Cidades[]> {
    const [result] = await this.repository.findAndCount({
      order: { nome: "ASC" },
      where: { id_uf: uf },
    });

    return result;
  }

  async findAll(): Promise<Cidades[]> {
    const [result] = await this.repository.findAndCount({
      relations: ["uf"],
      order: { nome: "ASC" }
    })

    return result;
  }
}