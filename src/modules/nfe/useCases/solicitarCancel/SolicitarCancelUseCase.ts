import { injectable } from "tsyringe";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Queue from "../../../../jobs/lib/queue";
import { ICreateNfeDTO } from "../../dtos/ICreateNfeDTO";

@injectable()
export class SolicitarCancelUseCase {

  constructor() { }

  async execute(cod_cliente: string, idNfe: string, motivo: string): Promise<void> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfe = await nfeRepositories.findById(idNfe);

    if (motivo.length <= 3)
      throw new Error("Informe o motivo do cancelamento");

    if (!nfe)
      throw new Error("NFe não encontrada");

    const newNfe: ICreateNfeDTO = {
      id: nfe.id,
      id_cliente: nfe.id_cliente,
      id_empresa: nfe.id_empresa,
      desconto: nfe.desconto,
      total: nfe.total,
      situacao: ""
    };

    await nfeRepositories.create(newNfe);

    await Queue.add("CancelaNfe", { idNfe, cod_cliente, motivo });
  }

}