import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { EmpresasRepositories } from "../../infra/typeorm/repositories/EmpresasRepositories";

@injectable()
export class DeleteEmpresaUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: EmpresasRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const empresa = await this.empresasRepositories.findById(id);

    if (!empresa)
      throw new AppError("Empresa não encontrada");

    await this.empresasRepositories.deleteById(id);
  }
}