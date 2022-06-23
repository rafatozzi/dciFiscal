import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { IConsultaNfeDTO } from "../../dtos/IConsultaNfeDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import { ICreateNfeXmlDTO } from "../../dtos/ICreateNfeXmlDTO";
import { NfeXmlRepositories } from "../../infra/typeorm/repositories/NfeXmlRepositories";

@injectable()
export class ConsultaNfeUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente }) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);
    const nfeXmlRepository = new NfeXmlRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe) {
      console.log("NFe não encontrada");
      throw new Error("NFe não encontrada");
    }

    const empresa = await empresaRepositories.findById(nfe.id_empresa);

    if (!empresa)
      throw new Error("Empresa não encontrada");

    const jsonRequest: IConsultaNfeDTO = {
      senha_certificado: empresa.senha_cert,
      empresa: {
        razao: empresa.razao,
        fantasia: empresa.fantasia,
        cnpj: empresa.cnpj,
        ie: empresa.ie,
        bairro: empresa.bairro,
        cep: empresa.cep,
        cidade: empresa.cidade.nome,
        cidade_ibge: empresa.cidade.ibge,
        complemento: empresa.complemento,
        crt: empresa.crt,
        endereco: empresa.endereco,
        fone: empresa.fone,
        nr: empresa.nr,
        uf: empresa.cidade.uf.uf,
        uf_ibge: empresa.cidade.uf.ibge
      },
      info_nfe: {
        ambiente: empresa.ambiente,
        data_hora: this.dayjsDateProvider.dateNow(),
        nr_nfe: nfe.nr_nfe,
        serie_nfe: empresa.serie_nfe
      },
      xml_assinado: nfe.list_xml.find(i => i.acao === "xml").xml,
      recibo: nfe.recibo
    }

    const formData = new FormData();

    const certFolder = resolve(__dirname, "..", "..", "..", "..", "..", "archives", "cert");
    const file = fs.createReadStream(`${certFolder}/${empresa.id}.pfx`);

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, { knownLength: fs.statSync(`${certFolder}/${empresa.id}.pfx`).size });

    await axios.post(`${process.env.URL_NFE_PHP}/consulta.php`, formData, {
      headers: {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
      },
    })
      .then(async (res) => {

        if (!res.data || !res.data.processado || !res.data.situacao) {
          console.log("Erro consultar NFe na SEFAZ");
          throw new Error("Erro consultar NFe na SEFAZ");
        }

        await nfeRepositories.create({
          ...nfe,
          status: res.data.status,
          situacao: res.data.situacao,
          motivo: res.data.motivo,
          protocolo: res.data.numeroProtocolo
        });

        let newXml = {
          id: nfe.list_xml.find(i => i.acao === "xml").id,
          id_nfe: nfe.id,
          acao: "xml",
          xml: res.data.xmlProtocolado
        } as ICreateNfeXmlDTO;

        if (nfe.id !== undefined)
          await nfeXmlRepository.create(newXml);

      })
      .catch(async (err) => {
        if (err.response.data.erro)
          await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: err.response.data.erro, status: 0 });
        else
          await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: "ERRO AO CONSULTAR", status: 0 });
        console.log(err.response.data);
        throw new Error(err.response.data);
      });
  }
}