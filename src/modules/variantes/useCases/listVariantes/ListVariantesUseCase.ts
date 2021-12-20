import { injectable } from "tsyringe";
import { IListVariantesResponseDTO } from "../../dtos/IListVariantesResponseDTO";
import { VariantesRepositories } from "../../infra/typeorm/repositories/VariantesRepositories";

@injectable()
export class ListVariantesUseCase {

  constructor(
    // @inject("VariantesRepositories")
    // private variantesRepositories: IVariantesRepositories
  ) { }

  async execute(cod_cliente: string, pesquisa?: string, limit?: number, cursor?: number): Promise<IListVariantesResponseDTO> {
    const variantesRepositories = new VariantesRepositories(cod_cliente);
    const result = await variantesRepositories.findAll(pesquisa, limit, cursor);

    return result;
  }

}