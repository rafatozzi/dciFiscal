import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { IEnviaLoteDTO } from "../../dtos/IEnviaLoteDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import Queue from "../../../../jobs/lib/queue";

@injectable()
export class EnviaLoteUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente }) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe) {
      console.log("NFe não encontrada");
      throw new Error("NFe não encontrada");
    }

    const empresa = await empresaRepositories.findById(nfe.id_empresa);

    if (!empresa)
      throw new Error("Empresa não encontrada");

    const jsonRequest: IEnviaLoteDTO = {
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
      xml: nfe.list_xml.find(i => i.acao === "xml").xml
    }

    const formData = new FormData();

    const certFolder = resolve(__dirname, "..", "..", "..", "..", "..", "archives", "cert");
    const file = fs.createReadStream(`${certFolder}/${empresa.id}.pfx`);

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, { knownLength: fs.statSync(`${certFolder}/${empresa.id}.pfx`).size });

    await axios.post(`${process.env.URL_NFE_PHP}/envia_lote.php`, formData, {
      headers: {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
      },
    })
      .then(async (res) => {

        if (!res.data || !res.data.idLote || !res.data.recibo) {
          console.log("Erro ao enviar lote da NFe para SEFAZ");
          throw new Error("Erro ao enviar lote da NFe para SEFAZ");
        }

        await nfeRepositories.create({ ...nfe, recibo: res.data.recibo });

        await Queue.add("ConsultaNfe", { idNfe, cod_cliente });

      })
      .catch(async (err) => {
        await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: "ERRO AO ENVIAR LOTE", status: 0 });
        console.log(err.response);
        throw new Error(err);
      });

  }
}