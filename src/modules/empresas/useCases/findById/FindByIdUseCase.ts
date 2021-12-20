import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Empresas } from "../../infra/typeorm/entities/Empresas";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class FindByIdUseCase {

  constructor(
    // @inject("EmpresasRepositories")
    // private empresasRepositories: IEmpresasRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<Empresas> {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const result = await empresasRepositories.findById(id);

    if (!result)
      throw new AppError("Empresa não encontrada");

    return result;
  }

}