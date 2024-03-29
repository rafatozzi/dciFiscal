import { Request, Response } from "express";
import { container } from "tsyringe";
import { RelatorioOrdemServicoUseCase } from "./RelatorioOrdemServicoUseCase";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export class RelatorioOrdemServicoController {
  async handle(request: Request, response: Response) {
    const { pesquisa, limit, cursor } = request.body;

    const useCase = container.resolve(RelatorioOrdemServicoUseCase);

    const result = await useCase.execute(request.cod_cliente, pesquisa, limit, cursor);

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
          text: "RELATÓRIO DE ORDEM DE SERVIÇO\n\n", style: "header"
        },
        {
          text: `${result.dataHora}\n\n`, style: "label"
        },
        {
          table: {
            widths: ["*", "auto", "auto", "auto", "auto"],
            heights: function (row) {
              return 30;
            },
            body: [
              [
                { text: "Cliente", style: "headerTable", border: [false, false, false, false] },
                { text: "Empresa", style: "headerTable", border: [false, false, false, false] },
                { text: "Data/Hora", style: "headerTable", border: [false, false, false, false] },
                { text: "Status", style: "headerTable", border: [false, false, false, false] },
                { text: "Valor", style: "headerTable", alignment: "right", border: [false, false, false, false] },
              ],
              ...result.tableBody,
              [
                {
                  text: `Total: ${result.total}`,
                  style: "rowTable",
                  border: [false, true, false, false],
                  fillColor: '#FFFFFF',
                  colSpan: 5,
                  alignment: "right"
                },
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
          fontSize: 10,
          margin: [0, 10, 0, 0]
        },
        label: {
          fontSize: 12,
          bold: true,
          alignment: "center"
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