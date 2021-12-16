import { getRepository, Repository } from "typeorm";
import { ICreateProdutosDTO } from "../../../dtos/ICreateProdutosDTO";
import { IProdutosVariantesRepositories } from "../../../repositories/IProdutosVariantesRepositories";
import { ProdutosVariantes } from "../entities/ProdutosVariantes";

export class ProdutosVariantesRepositories implements IProdutosVariantesRepositories {
  private repository: Repository<ProdutosVariantes>;

  constructor() {
    this.repository = getRepository(ProdutosVariantes);
  }

  async create(data: ICreateProdutosDTO[]): Promise<void> {
    data.map(async (item) => {
      const variante = this.repository.create({ ...item });

      await this.repository.save(variante);
    });
  }

  async findById(id: string): Promise<ProdutosVariantes> {
    return await this.repository.findOne(id);
  }

  async findByProduto(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_produtos: id });
  }

  async findByVariante(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_variante: id });
  }

  async findByVarianteValor(id: string): Promise<ProdutosVariantes[]> {
    return await this.repository.find({ id_variante_valores: id });
  }

  async deleteById(id: string): Promise<void> {
    const produtoVar = await this.repository.findOne(id);

    produtoVar.excluir = true;

    await this.repository.save(produtoVar);
  }

}