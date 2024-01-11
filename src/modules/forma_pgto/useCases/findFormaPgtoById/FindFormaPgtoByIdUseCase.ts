import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { FormaPgto } from "../../infra/typeorm/entities/FormaPgto";
import { FormaPgtoRepositories } from "../../infra/typeorm/repositories/FormaPgtoRepositories";

@injectable()
export class FindFormaPgtoByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<FormaPgto> {
    const repositories = new FormaPgtoRepositories(cod_cliente);

    const formaPgto = await repositories.findById(id);

    if (!formaPgto)
      throw new AppError("Forma de pagamento não encontrado");

    return formaPgto;
  }
}