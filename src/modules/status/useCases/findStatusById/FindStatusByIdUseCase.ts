import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Status } from "../../infra/typeorm/entities/Status";
import { StatusRepositories } from "../../infra/typeorm/repositories/StatusRepositories";

@injectable()
export class FindStatusByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Status> {
    const repositories = new StatusRepositories(cod_cliente);
    const status = await repositories.findById(id);

    if (!status)
      throw new AppError("Status não encontrado");

    return status;
  }
}