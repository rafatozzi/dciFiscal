import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Empresas } from "../../infra/typeorm/entities/Empresas";
import { IEmpresasRepositories } from "../../repositories/IEmpresasRepositories";

@injectable()
export class FindByIdUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: IEmpresasRepositories
  ) { }

  async execute(id: string): Promise<Empresas> {
    const result = await this.empresasRepositories.findById(id);

    if (!result)
      throw new AppError("Empresa não encontrada");

    return result;
  }

}