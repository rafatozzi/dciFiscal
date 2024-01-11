import { getRepository, Repository } from "typeorm";
import { ICreateOrdemServicoProdutosDTO } from "../../../dtos/ICreateOrdemServicoProdutosDTO";
import { IOrdemServicoProdutosRepositories } from "../../../repositories/IOrdemServicoProdutosRepositories";
import { OrdemServicoProdutos } from "../entities/OrdemServicoProdutos";

export class OrdemServicoProdutosRepositories implements IOrdemServicoProdutosRepositories {
  private repository: Repository<OrdemServicoProdutos>;

  constructor(connectionName: string) {
    this.repository = getRepository(OrdemServicoProdutos, connectionName);
  }

  async create(data: ICreateOrdemServicoProdutosDTO[]): Promise<void> {
    data.map(async (item) => {
      const produto = this.repository.create({ ...item });

      await this.repository.save(produto);
    });
  }

  async findById(id: string): Promise<OrdemServicoProdutos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["produto"]
      }
    );
  }

  async findByOrdemServico(id: string): Promise<OrdemServicoProdutos[]> {
    return await this.repository.find(
      {
        where: { id_ordem_servico: id, excluir: false },
        relations: ["produto"]
      }
    );
  }

  async deleteById(id: string): Promise<void> {
    const produto = await this.repository.findOne(id);

    produto.excluir = true;

    await this.repository.save(produto);
  }
}