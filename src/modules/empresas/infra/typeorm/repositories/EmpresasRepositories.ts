import { getRepository, Repository } from "typeorm";
import { Empresas } from "../entities/Empresas";
import { IEmpresasRepositories } from "../../../repositories/IEmpresasRepositories";
import { ICreateEmpresasDTO } from "../../../dtos/ICreateEmpresasDTO";

export class EmpresasRepositories implements IEmpresasRepositories {
  private repository: Repository<Empresas>;

  constructor() {
    this.repository = getRepository(Empresas);
  }

  async create(data: ICreateEmpresasDTO): Promise<Empresas> {
    throw new Error("Method not implemented.");
  }

  async findAll(pesquisa?: string, limit?: number, cursor?: number): Promise<Empresas[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Empresas> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}