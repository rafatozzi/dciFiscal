import { injectable } from "tsyringe";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Queue from "../../../../jobs/lib/queue";

@injectable()
export class EmitirNfeUseCase {

  constructor() { }

  async execute(cod_cliente: string, idNfe: string): Promise<void> {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const nfe = nfeRepositories.findById(idNfe);

    if (!nfe)
      throw new Error("NFe não encontrada");

    await Queue.add("GeraXmlAssinado", { idNfe, cod_cliente });
  }

}