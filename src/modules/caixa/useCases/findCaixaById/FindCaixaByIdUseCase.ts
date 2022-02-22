import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Caixa } from "../../infra/typeorm/entities/Caixa";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";

@injectable()
export class FindCaixaByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Caixa> {
    const repositories = new CaixaRepositories(cod_cliente);

    const caixa = await repositories.findById(id);

    if (!caixa)
      throw new AppError("Cadastro não encontrado");

    return caixa;
  }
}