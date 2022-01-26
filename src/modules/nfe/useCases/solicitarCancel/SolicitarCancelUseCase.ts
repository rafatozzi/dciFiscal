import { injectable } from "tsyringe";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Queue from "../../../../jobs/lib/queue";

@injectable()
export class SolicitarCancelUseCase {

  constructor() { }

  async execute(cod_cliente: string, idNfe: string, motivo: string): Promise<void> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfe = nfeRepositories.findById(idNfe);

    if (motivo.length <= 3)
      throw new Error("Informe o motivo do cancelamento");

    if (!nfe)
      throw new Error("NFe não encontrada");

    await Queue.add("CancelaNfe", { idNfe, cod_cliente, motivo });
  }

}