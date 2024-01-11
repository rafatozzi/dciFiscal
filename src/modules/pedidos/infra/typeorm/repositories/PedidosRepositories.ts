import { getRepository, Repository, MoreThanOrEqual, LessThanOrEqual, Raw } from "typeorm";
import { ICreatePedidosDTO } from "../../../dtos/ICreatePedidosDTO";
import { IFiltersPedidosDTO } from "../../../dtos/IFiltersPedidosDTO";
import { IListPedidosDTO } from "../../../dtos/IListPedidosDTO";
import { IPedidosRepositories } from "../../../repositories/IPedidosRepositories";
import { Pedidos } from "../entities/Pedidos";

export class PedidosRepositories implements IPedidosRepositories {
  private repository: Repository<Pedidos>;

  constructor(connectionName: string) {
    this.repository = getRepository(Pedidos, connectionName);
  }

  async create(data: ICreatePedidosDTO): Promise<Pedidos> {

    const pedido = this.repository.create({ ...data });

    await this.repository.save(pedido);

    return pedido;
  }

  async findAll(pesquisa?: IFiltersPedidosDTO, limit?: number, cursor?: number): Promise<IListPedidosDTO> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa) {
      if (pesquisa.cliente)
        where = { ...where, id_cliente: pesquisa.cliente };

      if (pesquisa.empresa)
        where = { ...where, id_empresa: pesquisa.empresa };

      if (pesquisa.date_ini)
        where = { ...where, created_at: MoreThanOrEqual(pesquisa.date_ini) };

      if (pesquisa.date_fin)
        where = { ...where, created_at: LessThanOrEqual(pesquisa.date_fin) };

      if (pesquisa.pago) {
        switch (pesquisa.pago) {
          case "s":
            where = { ...where, valor_pago: Raw((alias) => `${alias} >= total - desconto`) }
            break;

          case "n":
            where = { ...where, valor_pago: Raw((alias) => `${alias} < total - desconto`) }
            break;
        }
      }

    }

    const [result, total] = await this.repository.findAndCount(
      {
        relations: ["empresa", "cliente"],
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

  async findById(id: string): Promise<Pedidos> {
    return await this.repository.findOne(
      id,
      {
        relations: [
          "empresa",
          "cliente",
          "pedidos",
          "pedidos.produto",
          "pedidos.produto.variantes",
          "pgtos",
          "cidade",
          "cidade.uf",
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