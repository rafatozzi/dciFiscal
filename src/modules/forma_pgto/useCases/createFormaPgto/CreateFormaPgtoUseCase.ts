import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateFormaPgtoDTO } from "../../dtos/ICreateFormaPgtoDTO";
import { FormaPgto } from "../../infra/typeorm/entities/FormaPgto";
import { FormaPgtoRepositories } from "../../infra/typeorm/repositories/FormaPgtoRepositories";

@injectable()
export class CreateFormaPgtoUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateFormaPgtoDTO): Promise<FormaPgto> {
    const repositories = new FormaPgtoRepositories(cod_cliente);

    if (!data.id) {
      const exists = await repositories.findByNome(data.nome);

      if (exists)
        throw new AppError("Forma de Pagamento já cadastrado");
    }

    const formaPgto = await repositories.create(data);

    return formaPgto;
  }
}