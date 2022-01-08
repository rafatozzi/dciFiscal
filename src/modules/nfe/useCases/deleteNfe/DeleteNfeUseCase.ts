import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { NfePgtosRepositories } from "../../infra/typeorm/repositories/NfePgtosRepositories";
import { NfeProdutosRepositories } from "../../infra/typeorm/repositories/NfeProdutosRepositories";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class DeleteNfeUseCase {

  constructor(
    // @inject("NfeRepositories")
    // private nfeRepositories: INfeRepositories,
    // @inject("NfeProdutosRepositories")
    // private nfeProdutosRepositories: INfeProdutosRepositories,
    // @inject("NfePgtosRepositories")
    // private nfePgtosRepositories: INfePgtosRepositories
  ) { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfePgtosRepositories = new NfePgtosRepositories(cod_cliente);
    const nfeProdutosRepositories = new NfeProdutosRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(id);

    if (!nfe)
      throw new AppError("NFe não encontrado");

    const pgtos = await nfePgtosRepositories.findByPedido(nfe.id);
    const produtos = await nfeProdutosRepositories.findByPedido(nfe.id);

    pgtos.map(async (item) => {
      await nfePgtosRepositories.deleteNfePgtos(item.id);
    });

    produtos.map(async (item) => {
      await nfeProdutosRepositories.deleteNfeProdutos(item.id);
    });

    await nfeRepositories.deletePedido(id);
  }

}