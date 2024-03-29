import { getRepository, Like, Repository } from "typeorm";
import { ICreateClientesDTO } from "../../../dtos/ICreateClientesDTO";
import { IListClientesResponse } from "../../../dtos/IListClientesResponse";
import { IClientesRepositories } from "../../../repositories/IClientesRepositories";
import { Clientes } from "../entities/Clientes";

export class ClientesRepositories implements IClientesRepositories {
  private repository: Repository<Clientes>;

  constructor(connectionName: string) {
    this.repository = getRepository(Clientes, connectionName);
  }

  async create(data: ICreateClientesDTO): Promise<Clientes> {
    const cliente = this.repository.create({ ...data });

    await this.repository.save(cliente);

    return cliente;
  }

  async findFavoritos(): Promise<IListClientesResponse> {
    const [result, total] = await this.repository.findAndCount(
      {
        order: { razao_social: "ASC" },
        where: {
          favorito: true,
          excluir: false
        },
        relations: ["cidade", "cidade.uf"]
      }
    );

    return {
      total,
      result
    };
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListClientesResponse> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa)
      where = [
        { razao_social: Like(`%${pesquisa}%`), excluir: false },
        { fantasia: Like(`%${pesquisa}%`), excluir: false }
      ];

    const [result, total] = await this.repository.findAndCount(
      {
        order: { razao_social: "ASC" },
        take: limitPage,
        skip: cursorPage,
        where,
        relations: ["cidade", "cidade.uf"]
      }
    )

    return {
      total,
      result
    }
  }

  async findById(id: string): Promise<Clientes> {
    return await this.repository.findOne(
      id,
      {
        relations: ["cidade", "cidade.uf"]
      }
    );
  }

  async findByCpfCnpj(cpf_cnpj: number): Promise<Clientes> {
    return await this.repository.findOne({ cpf_cnpj, excluir: false });
  }

  async deleteById(id: string): Promise<void> {
    const cliente = await this.repository.findOne(id);

    cliente.excluir = true;

    await this.repository.save(cliente);
  }

}