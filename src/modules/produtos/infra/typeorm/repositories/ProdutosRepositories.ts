import { getRepository, Like, Repository } from "typeorm";
import { ICreateProdutosDTO } from "../../../dtos/ICreateProdutosDTO";
import { IListProdutosDTO } from "../../../dtos/IListProdutosDTO";
import { IProdutosRepositories } from "../../../repositories/IProdutosRepositories";
import { Produtos } from "../entities/Produtos";

export class ProdutosRepositories implements IProdutosRepositories {
  private repository: Repository<Produtos>;

  constructor(connectionName: string) {
    this.repository = getRepository(Produtos, connectionName);
  }

  async findByNome(nome: string): Promise<Produtos> {
    return await this.repository.findOne({ nome });
  }

  async create(data: ICreateProdutosDTO): Promise<Produtos> {
    const produto = this.repository.create({ ...data });

    await this.repository.save(produto);

    return produto;
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListProdutosDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    const where =
      pesquisa ?
        [
          { nome: Like(`%${pesquisa}%`), excluir: false },
          { cod_barras: Like(`%${pesquisa}%`), excluir: false }
        ] :
        { excluir: false };

    const [result, total] = await this.repository.findAndCount(
      {
        relations: ["variantes", "variantes.variante", "variantes.variante_valor"],
        order: { nome: "ASC" },
        take: limitPage,
        skip: cursorPage,
        where
      }
    )

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<Produtos> {
    return await this.repository.findOne(
      id,
      {
        relations: ["variantes", "variantes.variante", "variantes.variante_valor"]
      }
    );
  }

  async findByCodBarras(codigo_barras: string): Promise<Produtos> {
    return await this.repository.findOne(
      { cod_barras: codigo_barras, excluir: false },
      {
        relations: ["variantes", "variantes.variante", "variantes.variante_valor"]
      }
    );
  }

  async deleteProduto(id: string): Promise<void> {
    const produto = await this.repository.findOne(id);

    produto.excluir = true;

    await this.repository.save(produto);
  }

}