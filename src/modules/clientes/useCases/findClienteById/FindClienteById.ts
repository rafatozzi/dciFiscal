import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Clientes } from "../../infra/typeorm/entities/Clientes";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";

@injectable()
export class FindClienteByIdUseCase {

  constructor(
    // @inject("ClientesRepositories")
    // private clientesRepositories: IClientesRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<Clientes> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);
    const cliente = await clientesRepositories.findById(id);

    if (!cliente)
      throw new AppError("Cliente não encontrado");

    return cliente;
  }

}