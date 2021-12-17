import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IEmpresasRepositories } from "../../repositories/IEmpresasRepositories";

@injectable()
export class DeleteEmpresaUseCase {

  constructor(
    @inject("EmpresasRepositories")
    private empresasRepositories: IEmpresasRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const empresa = await this.empresasRepositories.findById(id);

    if (!empresa)
      throw new AppError("Empresa não encontrada");

    await this.empresasRepositories.deleteById(id);
  }
}