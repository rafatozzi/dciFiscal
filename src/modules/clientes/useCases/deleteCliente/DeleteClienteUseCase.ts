import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IClientesRepositories } from "../../repositories/IClientesRepositories";

@injectable()
export class DeleteClienteUseCase {

  constructor(
    @inject("ClientesRepositories")
    private clientesRepositories: IClientesRepositories
  ) { }

  async execute(id: string): Promise<void> {
    const cliente = await this.clientesRepositories.findById(id);

    if (!cliente)
      throw new AppError("Cliente não encontrado");

    await this.clientesRepositories.deleteById(id);
  }

}