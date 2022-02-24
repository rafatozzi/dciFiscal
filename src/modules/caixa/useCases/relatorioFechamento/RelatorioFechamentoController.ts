import { Request, Response } from "express";
import { container } from "tsyringe";
import { RelatorioFechamentoUseCase } from "./RelatorioFechamentoUseCase";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Caixa } from "../../infra/typeorm/entities/Caixa";

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

    const tableBody = [];

    for await (let mov of caixa.financeiro) {
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

      valor += mov.credito;
      valor += mov.debito;

      const row = new Array();
      row.push({ text: mov.created_at, border: [true, false, false, false], style: "rowTable" });
      row.push({ text: tempTipo, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: descricao, border: [false, false, false, false], style: "rowTable" });
      row.push({ text: valor, alignment: "right", border: [false, false, true, false], style: "rowTable" });

      tableBody.push(row);
    }

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

    const printer = new PDFPrinter(fonts);

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          text: "FECHAMENTO DE CAIXA\n\n", style: "header"
        },
        {
          table: {
            widths: [100, 'auto', 'auto', 100],
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
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF', },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF', },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF', },
                { text: "", border: [false, true, false, false], fillColor: '#FFFFFF', },
              ]
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              if (rowIndex === 0)
                return "#477ff4";
              else
                return (rowIndex % 2 === 0) ? "#CCCCCC" : null;
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