import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { ICancelaNfeDTO } from "../../dtos/ICancelaNfeDTO";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import { ICreateNfeXmlDTO } from "../../dtos/ICreateNfeXmlDTO";
import { NfeXmlRepositories } from "../../infra/typeorm/repositories/NfeXmlRepositories";

@injectable()
export class CancelaNfeUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente, motivo }) {
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
      throw new Error("Empresa não encontrada"); const jsonRequest: ICancelaNfeDTO = {
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
        chave: nfe.chave,
        justificativa: motivo,
        nrProtocolo: nfe.protocolo
      }

    const formData = new FormData();

    const certFolder = resolve(__dirname, "..", "..", "..", "..", "..", "archives", "cert");
    const file = fs.createReadStream(`${certFolder}/${empresa.id}.pfx`);

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, { knownLength: fs.statSync(`${certFolder}/${empresa.id}.pfx`).size });

    await axios.post(`${process.env.URL_NFE_PHP}/cancelamento.php`)
      .then(async (res) => {

        if (!res.data || !res.data.xml) {
          console.log("Erro ao cancelar NFe");
          throw new Error("Erro ao cancelar NFe");
        }

        await nfeRepositories.create({
          ...nfe,
          status: res.data.status,
          situacao: "CANCELADA",
          cancelado: true,
          cancel_motivo: motivo,
        });

        let newXml = {
          id_nfe: nfe.id,
          acao: "cancelamento",
          xml: res.data.xml
        } as ICreateNfeXmlDTO;

        await nfeXmlRepository.create(newXml);

      })
      .catch(async (err) => {
        await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: "ERRO AO CANCELAR", status: 0 });
        console.log(err.response.data);
        throw new Error(err.response.data);
      });
  }
}