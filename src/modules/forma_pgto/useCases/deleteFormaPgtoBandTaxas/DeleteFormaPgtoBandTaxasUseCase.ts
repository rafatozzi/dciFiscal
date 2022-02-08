import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { FormaPgtoBandTaxasRepositories } from "../../infra/typeorm/repositories/FormaPgtoBandTaxasRepositories";

@injectable()
export class DeleteFormaPgtoBandTaxasUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new FormaPgtoBandTaxasRepositories(cod_cliente);

    const taxa = await repositories.findById(id);

    if (!taxa)
      throw new AppError("Taxa não encontrada");

    await repositories.deleteById(id);
  }
}