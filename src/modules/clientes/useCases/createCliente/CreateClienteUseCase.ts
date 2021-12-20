import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateClientesDTO } from "../../dtos/ICreateClientesDTO";
import { Clientes } from "../../infra/typeorm/entities/Clientes";
import { ClientesRepositories } from "../../infra/typeorm/repositories/ClientesRepositories";


@injectable()
export class CreateClienteUseCase {

  constructor(
    // @inject("ClientesRepositories")
    // private clientesRepositories: IClientesRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateClientesDTO): Promise<Clientes> {
    const clientesRepositories = new ClientesRepositories(cod_cliente);

    if (!data.id_cidades || data.id_cidades <= 0)
      throw new AppError("Cidade não informada");

    if (!data.id) {
      const alredyExists = await clientesRepositories.findByCpfCnpj(data.cpf_cnpj);

      if (alredyExists)
        throw new AppError("Cliente já cadastrado");
    }

    const empresa = await clientesRepositories.create(data);

    return empresa;
  }

}