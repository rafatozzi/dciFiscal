import { injectable } from "tsyringe";
import { ICreateStatusDTO } from "../../dtos/ICreateStatusDTO";
import { Status } from "../../infra/typeorm/entities/Status";
import { StatusRepositories } from "../../infra/typeorm/repositories/StatusRepositories";

@injectable()
export class CreateStatusUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateStatusDTO): Promise<Status> {
    const repositories = new StatusRepositories(cod_cliente);

    if (!data.id) {
      const exists = await repositories.findByName(data.nome);

      if (exists)
        throw new Error("Status já cadastrado");
    }

    const status = await repositories.create(data);

    return status;
  }
}