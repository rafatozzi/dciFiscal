import { injectable } from "tsyringe";
import { FinanceiroRepositories } from "../../infra/typeorm/repositories/FinanceiroRepositories";

@injectable()
export class DeleteFinanceiroUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new FinanceiroRepositories(cod_cliente);

    const financeiro = await repositories.findById(id);

    if (!financeiro)
      throw new Error("Cadastro não encontrado");

    await repositories.deleteById(id);
  }
}