import { getRepository, Repository } from "typeorm";
import { ICreateOrdemServicoPgtosDTO } from "../../../dtos/ICreateOrdemServicoPgtosDTO";
import { IOrdemServicoPgtosRepositories } from "../../../repositories/IOrdemServicoPgtosRepositories";
import { OrdemServicoPgtos } from "../entities/OrdemServicoPgtos";

export class OrdemServicoPgtosRepositories implements IOrdemServicoPgtosRepositories {
  private repository: Repository<OrdemServicoPgtos>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServicoPgtos, connectionName);
  }

  async create(data: ICreateOrdemServicoPgtosDTO[]): Promise<void> {
    data.map(async (item) => {
      const obs = this.repository.create({ ...item });

      await this.repository.save(obs);
    });
  }

  async findById(id: string): Promise<OrdemServicoPgtos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["formaPgto"]
      }
    );
  }

  async findByOrdemServico(id: string): Promise<OrdemServicoPgtos[]> {
    return await this.repository.find(
      {
        where: { id_ordem_servico: id, excluir: false },
        relations: ["formaPgto"]
      }
    );
  }

  async deleteById(id: string): Promise<void> {
    const pgto = await this.repository.findOne(id);

    pgto.excluir = true;

    await this.repository.save(pgto);
  }
}