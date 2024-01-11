import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Financeiro } from "../../infra/typeorm/entities/Financeiro";
import { FinanceiroRepositories } from "../../infra/typeorm/repositories/FinanceiroRepositories";

injectable()
export class FindFinanceiroByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Financeiro> {
    const repositories = new FinanceiroRepositories(cod_cliente);

    const financeiro = await repositories.findById(id);

    if (!financeiro)
      throw new AppError("Cadastro não encontrado");

    return financeiro;
  }
}