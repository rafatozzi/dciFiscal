import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Caixa } from "../../infra/typeorm/entities/Caixa";

@injectable()
export class RelatorioFechamentoUseCase {
  constructor() { }

  async execute(cod_cliente: string, idCaixa: string): Promise<any> {
    const caixaRepositories = new CaixaRepositories(cod_cliente);

    const caixa = await caixaRepositories.findById(idCaixa);

    if (!caixa)
      throw new AppError("Caixa não encontrado");

    return caixa;
  }
}