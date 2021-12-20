import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class DeleteEmpresaUseCase {

  constructor(
    // @inject("EmpresasRepositories")
    // private empresasRepositories: IEmpresasRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const empresa = await empresasRepositories.findById(id);

    if (!empresa)
      throw new AppError("Empresa não encontrada");

    await empresasRepositories.deleteById(id);
  }
}