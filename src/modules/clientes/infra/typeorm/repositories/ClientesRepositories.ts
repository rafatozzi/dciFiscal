import { getRepository, Like, Repository } from "typeorm";
import { ICreateClientesDTO } from "../../../dtos/ICreateClientesDTO";
import { IListClientesResponse } from "../../../dtos/IListClientesResponse";
import { IClientesRepositories } from "../../../repositories/IClientesRepositories";
import { Clientes } from "../entities/Clientes";

export class ClientesRepositories implements IClientesRepositories {
  private repository: Repository<Clientes>;

  constructor() {
    this.repository = getRepository(Clientes);
  }

  async create(data: ICreateClientesDTO): Promise<Clientes> {
    const cliente = this.repository.create({ ...data });

    await this.repository.save(cliente);

    return cliente;
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<IListClientesResponse> {
    const limitPage = limit ? limit : 25;
    const cursorPage = cursor ? cursor : 0;

    let where: any = { excluir: false };

    if (pesquisa)
      where = [
        { razao: Like(`%${pesquisa}%`), excluir: false },
        { fantasia: Like(`%${pesquisa}%`), excluir: false }
      ];

    const [result, total] = await this.repository.findAndCount(
      {
        order: { razao_social: "ASC" },
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

  async findById(id: string): Promise<Clientes> {
    return await this.repository.findOne(id);
  }

  async findByCpfCnpj(cpf_cnpj: string): Promise<Clientes> {
    return await this.repository.findOne(cpf_cnpj);
  }

  async deleteById(id: string): Promise<void> {
    const cliente = await this.repository.findOne(id);

    cliente.excluir = true;

    await this.repository.save(cliente);
  }

}