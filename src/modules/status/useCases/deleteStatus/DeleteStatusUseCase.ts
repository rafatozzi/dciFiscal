import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { StatusRepositories } from "../../infra/typeorm/repositories/StatusRepositories";

@injectable()
export class DeleteStatusUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new StatusRepositories(cod_cliente);

    const servico = await repositories.findById(id);

    if (!servico)
      throw new AppError("Serviço não encontrado");

    await repositories.deleteStatus(id);
  }
}