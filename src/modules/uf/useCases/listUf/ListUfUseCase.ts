import { injectable, inject } from "tsyringe";
import { Uf } from "../../infra/typeorm/entities/Uf";
import { UfRepositories } from "../../infra/typeorm/repositories/UfRepositories";

@injectable()
export class ListUfUseCase {

  constructor(
    @inject("UfRepositories")
    private ufRepositories: UfRepositories
  ) { }

  async execute(): Promise<Uf[]> {
    const result = await this.ufRepositories.findAll();
    return result;
  }

}