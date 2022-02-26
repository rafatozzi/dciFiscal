import { inject, injectable } from "tsyringe";
import { ICurrencyFormatterProvider } from "../../../../shared/container/providers/CurrencyFormatter/ICurrencyFormatterProvider";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IFiltersNfeDTO } from "../../dtos/IFiltersNfeDTO";
import { IRelatorioNfeDTO } from "../../dtos/IRelatorioNfeDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";

@injectable()
export class RelatorioNfeUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("CurrencyFormatterProvider")
    private currencyFormatterProvider: ICurrencyFormatterProvider
  ) { }

  async execute(cod_cliente: string, pesquisa?: IFiltersNfeDTO, limit?: number, cursor?: number): Promise<IRelatorioNfeDTO> {
    const nfeRepositories = new NfeRepositories(cod_cliente);

    const result = await nfeRepositories.findAll(pesquisa, limit, cursor);

    const list = result.result.sort((a: any, b: any) => {
      var result = (a["created_at"] < b["created_at"]) ? -1 : (a["created_at"] > b["created_at"]) ? 1 : 0;
      return result * 1;
    });

    const tableBody = [];
    let total = 0,
      totalCancelado = 0;

    for await (let item of list) {
      if (item.situacao === "AUTORIZADA")
        total += parseFloat(`${item.total}`);

      if (item.situacao === "CANCELADA")
        totalCancelado += parseFloat(`${item.total}`);

      const row = new Array();

      row.push({ text: item.nr_nfe, style: "rowTable", border: [true, false, false, false] });
      row.push({ text: item.cliente.fantasia, style: "rowTable", border: [false, false, false, false] });
      row.push({ text: item.empresa.fantasia, style: "rowTable", border: [false, false, false, false] });
      row.push({ text: this.dayjsDateProvider.converToDataHora(item.created_at), style: "rowTable", border: [false, false, false, false] });
      row.push({ text: this.currencyFormatterProvider.CurrencyFormatter(parseFloat(`${item.total}`)), style: "rowTable", border: [false, false, false, false] });
      row.push({ text: item.situacao, style: "rowTable", border: [false, false, true, false] });

      tableBody.push(row);
    }

    return {
      dataHora: this.dayjsDateProvider.converToDataHora(this.dayjsDateProvider.dateNow()),
      total: this.currencyFormatterProvider.CurrencyFormatter(parseFloat(`${total}`)),
      totalCancelado: this.currencyFormatterProvider.CurrencyFormatter(parseFloat(`${totalCancelado}`)),
      tableBody
    }
  }
}