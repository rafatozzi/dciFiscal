import { injectable, inject } from "tsyringe";
import { Uf } from "../../infra/typeorm/entities/Uf";
import { IUfRepositories } from "../../repositories/IUfRepositories";

@injectable()
export class ListUfUseCase {

  constructor(
    @inject("UfRepositories")
    private ufRepositories: IUfRepositories
  ) { }

  async execute(): Promise<Uf[]> {
    const result = await this.ufRepositories.findAll();
    return result;
  }

}