import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Nfe } from "../../infra/typeorm/entities/Nfe";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class FindByIdNfeUseCase {

  constructor(
    // @inject("NfeRepositories")
    // private nfeRepositories: INfeRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<Nfe> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfe = await nfeRepositories.findById(id);

    if (!nfe)
      throw new AppError("NFe não encontrado");

    return nfe;
  }

}