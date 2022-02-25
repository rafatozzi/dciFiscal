import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { CaixaRepositories } from "../../infra/typeorm/repositories/CaixaRepositories";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { ICurrencyFormatterProvider } from "../../../../shared/container/providers/CurrencyFormatter/ICurrencyFormatterProvider";
import { IRelatorioFechamentoDTO } from "../../dtos/IRelatorioFechamentoDTO";

@injectable()
export class RelatorioFechamentoUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("CurrencyFormatterProvider")
    private currencyFormatterProvider: ICurrencyFormatterProvider
  ) { }

  async execute(cod_cliente: string, idCaixa: string): Promise<IRelatorioFechamentoDTO> {
    const caixaRepositories = new CaixaRepositories(cod_cliente);

    const caixa = await caixaRepositories.findById(idCaixa);

    if (!caixa)
      throw new AppError("Caixa não encontrado");

    const tableBody = [];

    const list = caixa.financeiro.sort((a: any, b: any) => {
      var result = (a["created_at"] < b["created_at"]) ? -1 : (a["created_at"] > b["created_at"]) ? 1 : 0;
      return result * 1;
    });

    let movDinheiro = 0,
      movCartaoCredito = 0,
      movCartaoDebito = 0,
      movOutros = 0,
      movSangria = 0,
      movReforco = 0;

    for await (let mov of list) {
      if (mov.ordemServicoPgto === null) {
        movReforco += parseFloat(`${mov.credito}`);
        movSangria += parseFloat(`${mov.debito}`);
      } else {
        switch (mov.ordemServicoPgto.formaPgto.tipo_caixa) {
          case 1: movDinheiro += parseFloat(`${mov.credito}`); break;
          case 2: movCartaoCredito += parseFloat(`${mov.credito}`); break;
          case 3: movCartaoDebito += parseFloat(`${mov.credito}`); break;
          case 4: movOutros += parseFloat(`${mov.credito}`); break;
        }
      }

      let tempTipo = "";
      let descricao = mov.descricao;
      let valor = 0;

      if (mov.ordemServicoPgto === null && mov.credito > 0)
        tempTipo = "Reforço";
      else
        tempTipo = "Sangria";

      if (mov.ordemServicoPgto !== null) {
        tempTipo = "Pgto";
        descricao = `${descricao} ( ${mov.ordemServicoPgto.ordemServico.cliente.fantasia} )`;
      }

      valor += parseFloat(`${mov.credito}`);
      valor += parseFloat(`${mov.debito}`);

      const row = new Array();
      row.push({ text: this.dayjsDateProvider.converToDataHora(mov.created_at), border: [true, false, false, false], style: "rowTable" });
      row.push({ text: tempTipo, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: descricao, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: this.currencyFormatterProvider.CurrencyFormatter(valor), alignment: "right", border: [false, false, true, false], style: "rowTable" });

      tableBody.push(row);
    }

    return {
      valor_inicial: this.currencyFormatterProvider.CurrencyFormatter(caixa.valor_inicial),
      dinheiro: this.currencyFormatterProvider.CurrencyFormatter(caixa.dinheiro),
      cartao_credito: this.currencyFormatterProvider.CurrencyFormatter(caixa.cartao_credito),
      cartao_debito: this.currencyFormatterProvider.CurrencyFormatter(caixa.cartao_debito),
      movCartaoCredito: this.currencyFormatterProvider.CurrencyFormatter(movCartaoCredito),
      movCartaoDebito: this.currencyFormatterProvider.CurrencyFormatter(movCartaoDebito),
      movDinheiro: this.currencyFormatterProvider.CurrencyFormatter(movDinheiro),
      movOutros: this.currencyFormatterProvider.CurrencyFormatter(movOutros),
      movReforco: this.currencyFormatterProvider.CurrencyFormatter(movReforco),
      movSangria: this.currencyFormatterProvider.CurrencyFormatter(movSangria),
      tableBody
    }

  }
}