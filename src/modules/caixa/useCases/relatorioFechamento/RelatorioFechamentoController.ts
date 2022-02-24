import { Request, Response } from "express";
import { container } from "tsyringe";
import { RelatorioFechamentoUseCase } from "./RelatorioFechamentoUseCase";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Caixa } from "../../infra/typeorm/entities/Caixa";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { CurrencyFormatterProvider } from "../../../../shared/container/providers/CurrencyFormatter/implementations/CurrencyFormatterProvider";

export class RelatorioFechamentoController {
  async handle(request: Request, response: Response) {
    const { idCaixa } = request.body;

    // console.log(idCaixa);

    const useCase = container.resolve(RelatorioFechamentoUseCase);

    // const relatorio = await useCase.execute(request.cod_cliente, idCaixa);

    // console.log(relatorio);
    // const result = Buffer.concat(relatorio);
    // return response.status(200).end(result);

    const caixa = await useCase.execute(request.cod_cliente, idCaixa) as Caixa;
    const currencyFormatter = new CurrencyFormatterProvider();

    const tableBody = [];
    dayjs.extend(utc);

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
      row.push({ text: dayjs(mov.created_at).utc().local().format("DD/MM/YYYY HH:mm"), border: [true, false, false, false], style: "rowTable" });
      row.push({ text: tempTipo, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: descricao, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: currencyFormatter.CurrencyFormatter(valor), alignment: "right", border: [false, false, true, false], style: "rowTable" });

      tableBody.push(row);
    }

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
      }
    };

    const printer = new PDFPrinter(fonts);

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          text: "FECHAMENTO DE CAIXA\n\n", style: "header"
        },
        { text: "Valor Inicial:", style: "label" },
        { text: `${currencyFormatter.CurrencyFormatter(parseFloat(`${caixa.valor_inicial}`))}\n\n` },

        {
          columns: [
            { text: "Dinheiro:", style: "label" },
            { text: "Dinheiro Conferido:", style: "label" }
          ]
        },
        {
          columns: [
            { text: `${currencyFormatter.CurrencyFormatter(movDinheiro)}\n\n` },
            { text: `${currencyFormatter.CurrencyFormatter(caixa.dinheiro)}\n\n` }
          ]
        },

        {
          columns: [
            { text: "Cartão de Crédito:", style: "label" },
            { text: "C. Crédito Conferido:", style: "label" }
          ]
        },
        {
          columns: [
            { text: `${currencyFormatter.CurrencyFormatter(movCartaoCredito)}\n\n` },
            { text: `${currencyFormatter.CurrencyFormatter(caixa.cartao_credito)}\n\n` }
          ]
        },

        {
          columns: [
            { text: "Cartão de Débito:", style: "label" },
            { text: "C. Débito Conferido:", style: "label" }
          ]
        },
        {
          columns: [
            { text: `${currencyFormatter.CurrencyFormatter(movCartaoDebito)}\n\n` },
            { text: `${currencyFormatter.CurrencyFormatter(caixa.cartao_debito)}\n\n` }
          ]
        },

        { text: "Outros:", style: "label" },
        { text: `${currencyFormatter.CurrencyFormatter(movOutros)}\n\n` },

        { text: "Sangria:", style: "label" },
        { text: `${currencyFormatter.CurrencyFormatter(movSangria)}\n\n` },

        { text: "Reforço:", style: "label" },
        { text: `${currencyFormatter.CurrencyFormatter(movReforco)}\n\n` },

        {
          table: {
            widths: [100, "auto", "*", 100],
            heights: function (row) {
              return 30;
            },
            body: [
              [
                { text: "Data/Hora", style: "headerTable", border: [false, false, false, false] },
                { text: "Tipo", style: "headerTable", border: [false, false, false, false] },
                { text: "Descrição", style: "headerTable", border: [false, false, false, false] },
                { text: "Valor", style: "headerTable", alignment: "right", border: [false, false, false, false] },
              ],
              ...tableBody,
              [
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF' },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF' },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF' },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF' },
              ]
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              if (rowIndex === 0)
                return "#477ff4";
              else
                return (rowIndex % 2 === 0) ? "#EEEEEE" : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center"
        },
        headerTable: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 0],
          color: "#FFFFFF"
        },
        rowTable: {
          fontSize: 12,
          margin: [0, 10, 0, 0]
        },
        label: {
          fontSize: 12,
          bold: true,
        }
      }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      response.setHeader('Content-Type', 'application/pdf');
      return response.end(result);
    })
  }
}