import { injectable } from "tsyringe";
import { Caixa } from "../../infra/typeorm/entities/Caixa";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";

@injectable()
export class GetCaixaAbertaUseCase {
  constructor() { }

  async execute(cod_cliente: string): Promise<Caixa> {
    const repositories = new CaixaRepositories(cod_cliente);

    const caixa = await repositories.getCaixaAberto();

    return caixa;
  }
}