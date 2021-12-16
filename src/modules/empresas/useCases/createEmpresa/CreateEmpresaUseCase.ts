import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateEmpresasDTO } from "../../dtos/ICreateEmpresasDTO";
import { Empresas } from "../../infra/typeorm/entities/Empresas";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class CreateEmpresaUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: EmpresasRepositories
  ) { }

  async execute(data: ICreateEmpresasDTO): Promise<Empresas> {
    const alredyExists = await this.empresasRepositories.findByCNPJ(data.cnpj);

    if (alredyExists)
      throw new AppError("Empresa já cadastrada");

    const empresa = await this.empresasRepositories.create(data);

    return empresa;
  }
}