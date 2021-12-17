import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Clientes } from "../../infra/typeorm/entities/Clientes";
import { IClientesRepositories } from "../../repositories/IClientesRepositories";

@injectable()
export class FindClienteByIdUseCase {

  constructor(
    @inject("ClientesRepositories")
    private clientesRepositories: IClientesRepositories
  ) { }

  async execute(id: string): Promise<Clientes> {
    const cliente = await this.clientesRepositories.findById(id);

    if (!cliente)
      throw new AppError("Cliente não encontrado");

    return cliente;
  }

}