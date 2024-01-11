import { getRepository, Repository, Between } from "typeorm";
import { ICreateNfeDTO } from "../../../dtos/ICreateNfeDTO";
import { IFiltersNfeDTO } from "../../../dtos/IFiltersNfeDTO";
import { IListNfeDTO } from "../../../dtos/IListNfeDTO";
import { INfeRepositories } from "../../../repositories/INfeRepositories";
import { Nfe } from "../entities/Nfe";

export class NfeRepositories implements INfeRepositories {
  private repository: Repository<Nfe>;

  constructor(connectionName: string) {
    this.repository = getRepository(Nfe, connectionName);
  }

  async findByChave(chave: string): Promise<Nfe> {
    return await this.repository.findOne(
      { chave },
      {
        relations: [
          "empresa",
          "cliente",
          "cliente.cidade",
          "cliente.cidade.uf",
          "pedidos",
          "pedidos.produto",
          "pedidos.produto.variantes",
          "pgtos",
          "list_xml"
        ]
      }
    )
  }

  async create(data: ICreateNfeDTO): Promise<Nfe> {

    const pedido = this.repository.create({ ...data });

    await this.repository.save(pedido);

    return pedido;
  }

  async findAll(pesquisa?: IFiltersNfeDTO, limit?: number, cursor?: number): Promise<IListNfeDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {
      if (pesquisa.cliente)
        where = { ...where, id_cliente: pesquisa.cliente };

      if (pesquisa.empresa)
        where = { ...where, id_empresa: pesquisa.empresa };

      if (pesquisa.date_ini && pesquisa.date_fin)
        where = { ...where, created_at: Between(pesquisa.date_ini, pesquisa.date_fin) };
    }

    const [result, total] = await this.repository.findAndCount(
      {
        relations: [
          "empresa",
          "cliente",
          "cliente.cidade",
          "cliente.cidade.uf",
          "pedidos",
          "pedidos.produto",
          "pedidos.produto.variantes",
          "pgtos",
          "list_xml"
        ],
        order: { created_at: "DESC" },
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

  async findById(id: string): Promise<Nfe> {
    return await this.repository.findOne(
      id,
      {
        relations: [
          "empresa",
          "cliente",
          "cliente.cidade",
          "cliente.cidade.uf",
          "pedidos",
          "pedidos.produto",
          "pedidos.produto.variantes",
          "pgtos",
          "list_xml"
        ]
      }
    )
  }

  async deletePedido(id: string): Promise<void> {
    const pedido = await this.repository.findOne(id);

    pedido.excluir = true;

    await this.repository.save(pedido);
  }

}