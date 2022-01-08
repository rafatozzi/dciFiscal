import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { NfeProdutosRepositories } from "../../infra/typeorm/repositories/NfeProdutosRepositories";

@injectable()
export class DeleteNfeProdutosUseCase {
  constructor(
    // @inject("NfeProdutosRepositories")
    // private nfeProdutosRepositories: INfeProdutosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const nfeProdutosRepositories = new NfeProdutosRepositories(cod_cliente);
    const pedProduto = await nfeProdutosRepositories.findById(id);

    if (!pedProduto)
      throw new AppError("Item da NFe não encontrado");

    await nfeProdutosRepositories.deleteNfeProdutos(id);
  }
}