import { inject, injectable } from "tsyringe";
import { IListVariantesResponseDTO } from "../../dtos/IListVariantesResponseDTO";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class ListVariantesUseCase {

  constructor(
    @inject("VariantesRepositories")
    private variantesRepositories: VariantesRepositories
  ) { }

  async execute(pesquisa?: string, limit?: number, cursor?: number): Promise<IListVariantesResponseDTO> {
    const result = await this.variantesRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}