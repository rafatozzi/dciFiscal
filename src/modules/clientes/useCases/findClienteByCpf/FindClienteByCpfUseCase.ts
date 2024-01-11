import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Clientes } from "../../infra/typeorm/entities/Clientes";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";


@injectable()
export class FindClienteByCpfUseCase {

  constructor() { }

  async execute(cod_cliente: string, cpf: string): Promise<Clientes> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);

    if (!cpf || cpf.length < 10)
      throw new AppError("CPF/CNPJ não informado");

    const cliente = await clientesRepositories.findByCpfCnpj(parseInt(cpf));

    if (!cliente)
      throw new AppError("Cliente não encontrado");

    return cliente;
  }

}