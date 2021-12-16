import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Empresas } from "../../infra/typeorm/entities/Empresas";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class FindByIdUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: EmpresasRepositories
  ) { }

  async execute(id: string): Promise<Empresas> {
    const result = await this.empresasRepositories.findById(id);

    if (!result)
      throw new AppError("Empresa não encontrada");

    return result;
  }

}