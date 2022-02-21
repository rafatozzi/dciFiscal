import { injectable } from "tsyringe";
import { ICreateFinanceiroDTO } from "../../dtos/ICreateFinanceiroDTO";
import { Financeiro } from "../../infra/typeorm/entities/Financeiro";
import { FinanceiroRepositories } from "../../infra/typeorm/repositories/FinanceiroRepositories";

@injectable()
export class CreateFinanceiroUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateFinanceiroDTO): Promise<Financeiro> {

    const repositories = new FinanceiroRepositories(cod_cliente);

    const financeiro = await repositories.create(data);

    return financeiro;
  }
}