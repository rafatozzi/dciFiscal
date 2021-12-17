import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateClientesDTO } from "../../dtos/ICreateClientesDTO";
import { Clientes } from "../../infra/typeorm/entities/Clientes";
import { IClientesRepositories } from "../../repositories/IClientesRepositories";


@injectable()
export class CreateClienteUseCase {

  constructor(
    @inject("ClientesRepositories")
    private clientesRepositories: IClientesRepositories
  ) { }

  async execute(data: ICreateClientesDTO): Promise<Clientes> {

    if (!data.id_cidades || data.id_cidades <= 0)
      throw new AppError("Cidade não informada");

    if (!data.id) {
      const alredyExists = await this.clientesRepositories.findByCpfCnpj(data.cpf_cnpj);

      if (alredyExists)
        throw new AppError("Cliente já cadastrado");
    }

    const empresa = await this.clientesRepositories.create(data);

    return empresa;
  }

}