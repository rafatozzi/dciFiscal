import { inject, injectable } from "tsyringe";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { IEnviaEmailContadorDTO } from "../../dtos/IEnviaEmailContadorDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import JSZip from "jszip";
import { resolve } from "path";

@injectable()
export class JobEnviaEmailContadorUseCase {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute({ cod_cliente, idEmpresa, mes, ano }: IEnviaEmailContadorDTO) {
    const empresasRepositories = new EmpresasRepositories(cod_cliente);
    const nfeRepositories = new NfeRepositories(cod_cliente);

    const empresa = await empresasRepositories.findById(idEmpresa);

    if (!empresa)
      throw new Error("Empresa não encontrada");

    const listNfe = await nfeRepositories.findAll({
      empresa: empresa.id,
      date_ini: new Date(ano, parseInt(mes) - 1, 1, 0, 0, 0),
      date_fin: new Date(ano, parseInt(mes) - 1, 31, 23, 59, 59),
    }, 99999);

    const zip = new JSZip();

    if (listNfe.total <= 0)
      return;

    const xml = zip.folder("xml");
    const cancelamentos = zip.folder("cancelamentos");

    listNfe.result.map((item) => {
      if (item.list_xml && item.list_xml.length > 0) {
        item.list_xml.map((rs) => {
          if (rs.acao === "xml")
            xml.file(`${item.chave}.xml`, rs.xml);
          else if (rs.acao === "cancelamento")
            cancelamentos.file(`cancelamento-${item.chave}.xml`, rs.xml);
        });
      }
    });

    const zipFile = await zip.generateAsync({ type: "nodebuffer" });

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "envioXml.hbs");

    const variables = {
      razaoSocial: empresa.razao,
      ano,
      mes
    };

    await this.mailProvider.sendMail(
      empresa.email_contabilidade,
      `Envio de arquivos fiscais ${mes}/${ano}`,
      variables,
      templatePath,
      [
        {
          filename: `${mes}-${ano}.zip`,
          content: zipFile
        }
      ]
    );


  }
}