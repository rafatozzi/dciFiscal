import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCaixaDTO } from "../../dtos/ICreateCaixaDTO";
import { Caixa } from "../../infra/typeorm/entities/Caixa";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";

@injectable()
export class CreateCaixaUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateCaixaDTO): Promise<Caixa> {
    const repositories = new CaixaRepositories(cod_cliente);

    const caixaAberto = await repositories.getCaixaAberto();

    if (caixaAberto)
      throw new AppError("Existe um caixa aberto ainda.");

    const caixa = await repositories.create(data);

    return caixa;
  }
}