import { inject, injectable } from "tsyringe";
import { ICurrencyFormatterProvider } from "../../../../shared/container/providers/CurrencyFormatter/ICurrencyFormatterProvider";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IFilterOrdemServicoDTO } from "../../dtos/IFilterOrdemServicoDTO";
import { IRelatorioOrdemServicoDTO } from "../../dtos/IRelatorioOrdemServicoDTO";
import { OrdemServicoRepositories } from "../../infra/typeorm/repositories/OrdemServicoRepositories";

@injectable()
export class RelatorioOrdemServicoUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("CurrencyFormatterProvider")
    private currencyFormatterProvider: ICurrencyFormatterProvider
  ) { }

  async execute(cod_cliente: string, pesquisa: IFilterOrdemServicoDTO): Promise<IRelatorioOrdemServicoDTO> {
    const repositories = new OrdemServicoRepositories(cod_cliente);

    const result = await repositories.findAll(pesquisa, 5000, 0);

    const list = result.result.sort((a: any, b: any) => {
      var result = (a["created_at"] < b["created_at"]) ? -1 : (a["created_at"] > b["created_at"]) ? 1 : 0;
      return result * 1;
    });

    const tableBody = [];

    for await (let item of list) {
      let total = 0;

      item.produtos.map((rs) => { total += rs.valor_unit * rs.quantidade; })
      item.servicos.map((rs) => { total += rs.valor_unit * rs.quantidade; })

      const row = new Array();

      row.push({ text: item.cliente.fantasia, style: "rowTable", border: [true, false, false, false] });
      row.push({ text: item.empresa.fantasia, style: "rowTable", border: [false, false, false, false] });
      row.push({ text: this.dayjsDateProvider.converToDataHora(item.created_at), style: "rowTable", border: [false, false, false, false] });
      row.push({ text: this.currencyFormatterProvider.CurrencyFormatter(parseFloat(`${total}`)), style: "rowTable", border: [false, false, false, false] });
      row.push({ text: item.ult_status.nome, style: "rowTable", border: [false, false, true, false] });

      tableBody.push(row);
    }

    return {
      dataHora: this.dayjsDateProvider.converToDataHora(this.dayjsDateProvider.dateNow()),
      tableBody
    };

  }
}