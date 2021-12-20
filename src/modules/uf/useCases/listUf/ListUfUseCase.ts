import { injectable } from "tsyringe";
import { Uf } from "../../infra/typeorm/entities/Uf";
import { UfRepositories } from "../../infra/typeorm/repositories/UfRepositories";

@injectable()
export class ListUfUseCase {

  constructor(
    // @inject("UfRepositories")
    // private ufRepositories: IUfRepositories
  ) { }

  async execute(cod_cliente: string): Promise<Uf[]> {
    const ufRepositories = new UfRepositories(cod_cliente);
    const result = await ufRepositories.findAll();
    return result;
  }

}