import { injectable } from "tsyringe";
import { ICreateNfeDTO } from "../../dtos/ICreateNfeDTO";
import { Nfe } from "../../infra/typeorm/entities/Nfe";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class CreateNfeUseCase {

  constructor(
    // @inject("NfeRepositories")
    // private NfeRepositories: INfeRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateNfeDTO): Promise<Nfe> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const produto = await nfeRepositories.create(data);

    return produto;
  }

}