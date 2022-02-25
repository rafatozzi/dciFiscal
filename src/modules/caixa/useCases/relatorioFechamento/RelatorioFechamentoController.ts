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

    const useCase = container.resolve(RelatorioFechamentoUseCase);

    const relCaixa = await useCase.execute(request.cod_cliente, idCaixa);

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
        { text: `${relCaixa.valor_inicial}\n\n` },

        {
          columns: [
            { text: "Dinheiro:", style: "label" },
            { text: "Dinheiro Conferido:", style: "label" }
          ]
        },
        {
          columns: [
            { text: `${relCaixa.movDinheiro}\n\n` },
            { text: `${relCaixa.dinheiro}\n\n` }
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
            { text: `${relCaixa.movCartaoCredito}\n\n` },
            { text: `${relCaixa.cartao_credito}\n\n` }
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
            { text: `${relCaixa.movCartaoDebito}\n\n` },
            { text: `${relCaixa.cartao_debito}\n\n` }
          ]
        },

        { text: "Outros:", style: "label" },
        { text: `${relCaixa.movOutros}\n\n` },

        { text: "Sangria:", style: "label" },
        { text: `${relCaixa.movSangria}\n\n` },

        { text: "Reforço:", style: "label" },
        { text: `${relCaixa.movReforco}\n\n` },

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
              ...relCaixa.tableBody,
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