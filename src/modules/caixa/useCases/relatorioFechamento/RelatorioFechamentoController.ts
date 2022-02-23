import { Request, Response } from "express";
import { container } from "tsyringe";
import { RelatorioFechamentoUseCase } from "./RelatorioFechamentoUseCase";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Caixa } from "../../infra/typeorm/entities/Caixa";

export class RelatorioFechamentoController {
  async handle(request: Request, response: Response) {
    const { idCaixa } = request.body;

    const useCase = container.resolve(RelatorioFechamentoUseCase);

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
      row.push({ text: mov.created_at });
      row.push({ text: tempTipo });
      row.push({ text: descricao });
      row.push({ text: valor, alignment: "right" });

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
            heights: function (row) {
              return 30;
            },
            widths: [100, 'auto', 'auto', 100],
            body: [
              [
                { text: "Data/Hora", style: "headerTable" },
                { text: "Tipo", style: "headerTable" },
                { text: "Descrição", style: "headerTable" },
                { text: "Valor", style: "headerTable", alignment: "right" },
              ],
              ...tableBody
            ]
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
      return response.status(200).end(result);
    })

  }
}