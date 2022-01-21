import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { inject, injectable } from "tsyringe";
import { IGeraXmlAssinado } from "../../../../jobs/dtos/IGeraXmlAssinado";
import { IIbpt } from "../../../../jobs/dtos/IIbpt";
import { IProdutosApiNfe } from "../../../../jobs/dtos/IProdutosApiNfe";
import { IXmlAssinadoDTO } from "../../../../jobs/dtos/IXmlAssinadoDTO";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import { NfeXmlRepositories } from "../../infra/typeorm/repositories/NfeXmlRepositories";
import { NfeXml } from "../../infra/typeorm/entities/NfeXml";
import { ICreateNfeXmlDTO } from "../../dtos/ICreateNfeXmlDTO";

@injectable()
export class GeraXmlAssinado {
  constructor(
    @inject("DaysJsDateProvider")
    private dayJs: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente }: IGeraXmlAssinado) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe)
      throw new Error("NFe não encontrada");

    const empresa = await empresaRepositories.findById(nfe.id);

    const nrNFe = empresa.nr_nfe + 1;

    const produtos: IProdutosApiNfe[] = [];

    nfe.pedidos.map(async (item) => {
      let resIbpt = {} as IIbpt;

      await axios.get(`https://apidoni.ibpt.org.br/api/v1/produtos?token=${process.env.TOKEN_IBPT}&cnpj=${process.env.CNPJ_IBPT}&codigo=${item.produto.ncm}&uf=${empresa.cidade.uf.uf}&ex=0&descricao=produto&unidadeMedida=${item.produto.unid_med}&valor=${item.valor_unit}&gtin=sem%20gtin`)
        .then((res) => {
          resIbpt = res.data as IIbpt;

          if (resIbpt.Codigo === null)
            throw new Error(`NCM ${item.produto.ncm} do produto ${item.produto.nome} não encontrado para cálculo de impostos`);

          produtos.push({
            cfop: item.produto.cfop,
            codigo: item.produto.id.substring(0, 5),
            imp_estadual: resIbpt.Estadual,
            imp_federal: resIbpt.Nacional,
            ncm: item.produto.ncm,
            nome: item.produto.nome,
            quantidade: item.qtd,
            unid_medida: item.produto.unid_med,
            valor_uni: item.valor_unit
          })

        })
        .catch((err) => {
          if (err.response.data.message)
            throw new Error(err.response.data.message);
          else
            throw new Error(`Erro ao buscar aliquota do produto ${item.produto.nome} com NCM ${item.produto.ncm}`);
        });
    })

    const jsonRequest: IXmlAssinadoDTO = {
      senha_certificado: empresa.senha_cert,
      chave: nfe.chave,
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
        data_hora: this.dayJs.dateNow(),
        nr_nfe: nrNFe,
        serie_nfe: empresa.serie_nfe
      },
      cliente: {
        bairro: nfe.cliente.bairro,
        cep: parseInt(nfe.cliente.cep.replace(/[^0-9]/g, "")),
        cidade: nfe.cliente.cidade.nome,
        cidade_ibge: nfe.cliente.cidade.ibge,
        complemento: nfe.cliente.complemento,
        cpf_cnpj: nfe.cliente.cpf_cnpj,
        endereco: nfe.cliente.endereco,
        ie: nfe.cliente.rg_ie,
        nome: nfe.cliente.razao_social,
        nr: nfe.cliente.numero,
        telefone: nfe.cliente.telefone,
        uf: nfe.cliente.cidade.uf.uf
      },
      produtos
    }

    await empresaRepositories.create({ ...empresa, nr_nfe: nrNFe });

    const formData = new FormData();
    const file = fs.readFileSync(`../../../../archives/cert/${empresa.id}.pfx`, { encoding: 'base64' });

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, "certificado.pfx");

    await axios.post(`${process.env.URL_NFE_PHP}/xml_assinado.php`, formData, {
      headers: { ...formData.getHeaders() }
    })
      .then(async (res) => {
        if (!res.data)
          throw new Error("Erro os gerar xml da NFe");

        const nfeXmlRepository = new NfeXmlRepositories(cod_cliente);
        const dbXml: NfeXml[] = await nfeXmlRepository.findByNfe(nfe.id);

        let newXml = {
          id_nfe: nfe.id,
          acao: "xml",
          xml: res.data.xml
        } as ICreateNfeXmlDTO;

        if (dbXml.filter(i => i.acao === "xml").length > 0)
          newXml = { ...newXml, id: dbXml.find(i => i.acao === "xml").id };

        await nfeXmlRepository.create(newXml);

      })
      .catch((err) => {
        console.log(err.response.data);
        throw new Error(err.response.data);
      });
  }
}