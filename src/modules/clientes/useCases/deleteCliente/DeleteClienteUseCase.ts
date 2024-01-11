import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";

@injectable()
export class DeleteClienteUseCase {

  constructor(
    // @inject("ClientesRepositories")
    // private clientesRepositories: IClientesRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const cliente = await clientesRepositories.findById(id);

    if (!cliente)
      throw new AppError("Cliente não encontrado");

    await clientesRepositories.deleteById(id);
  }

}