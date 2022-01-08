import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { NfePgtosRepositories } from "../../infra/typeorm/repositories/NfePgtosRepositories";

@injectable()
export class DeleteNfePgtosUseCase {
  constructor(
    // @inject("NfePgtosRepositories")
    // private nfePgtosRepositories: INfePgtosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const nfePgtosRepositories = new NfePgtosRepositories(cod_cliente);
    const pedPgto = await nfePgtosRepositories.findById(id);

    if (!pedPgto)
      throw new AppError("Variante do produto não encontrado");

    await nfePgtosRepositories.deleteNfePgtos(id);
  }

}