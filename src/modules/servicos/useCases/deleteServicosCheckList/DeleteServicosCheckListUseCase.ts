import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ServicosCkeckListRepositories } from "../../infra/typeorm/repositories/ServicosCkeckListRepositories";

@injectable()
export class DeleteServicosCheckListUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new ServicosCkeckListRepositories(cod_cliente);
    const checklist = await repositories.findById(id);

    if (!checklist)
      throw new AppError("Check-list não encontrado");

    await repositories.deleteById(id);
  }
}