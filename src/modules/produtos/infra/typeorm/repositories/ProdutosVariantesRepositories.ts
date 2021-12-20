import { getRepository, Repository } from "typeorm";
import { ICreateProdutosVariantesDTO } from "../../../dtos/ICreateProdutosVariantesDTO";
import { IProdutosVariantesRepositories } from "../../../repositories/IProdutosVariantesRepositories";
import { ProdutosVariantes } from "../entities/ProdutosVariantes";

export class ProdutosVariantesRepositories implements IProdutosVariantesRepositories {
  private repository: Repository<ProdutosVariantes>;

  constructor(connectionName: string) {
    this.repository = getRepository(ProdutosVariantes, connectionName);
  }

  async create(data: ICreateProdutosVariantesDTO[]): Promise<void> {
    data.map(async (item) => {
      const variante = this.repository.create({ ...item });

      await this.repository.save(variante);
    });
  }

  async findById(id: string): Promise<ProdutosVariantes> {
    return await this.repository.findOne(id);
  }

  async findByProduto(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_produtos: id, excluir: false });
  }

  async findByVariante(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_variante: id, excluir: false });
  }

  async findByVarianteValor(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_variante_valores: id, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const produtoVar = await this.repository.findOne(id);

    produtoVar.excluir = true;

    await this.repository.save(produtoVar);
  }

}