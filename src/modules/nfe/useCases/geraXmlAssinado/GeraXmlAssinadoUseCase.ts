import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { EmpresasRepositories } from "../../../empresas/infra/typeorm/repositories/EmpresasRepositories";
import { NfeRepositories } from "../../infra/typeorm/repositories/NfeRepositories";
import { NfeXmlRepositories } from "../../infra/typeorm/repositories/NfeXmlRepositories";
import { NfeXml } from "../../infra/typeorm/entities/NfeXml";
import { ICreateNfeXmlDTO } from "../../dtos/ICreateNfeXmlDTO";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IProdutosApiNfe } from "../../dtos/IProdutosApiNfe";
import { IXmlAssinadoDTO } from "../../dtos/IXmlAssinadoDTO";
import { IIbpt } from "../../dtos/IIbpt";
import Queue from "../../../../jobs/lib/queue";
import { IPgtosApiNfe } from "../../dtos/IPgtosApiNfe";
import { NcmAliquotasRepositories } from "../../../NcmAliquotas/infra/typeorm/repositories/NcmAliquotasRepositories";

@injectable()
export class GeraXmlAssinadoUseCase {
  constructor(
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute({ idNfe, cod_cliente }: IGeraXmlAssinado) {
    const nfeRepositories = new NfeRepositories(cod_cliente);
    const empresaRepositories = new EmpresasRepositories(cod_cliente);
    const ncmAliquotaRepositories = new NcmAliquotasRepositories(cod_cliente);

    const nfe = await nfeRepositories.findById(idNfe);

    if (!nfe) {
      console.log("NFe não encontrada");
      throw new Error("NFe não encontrada");
    }

    const empresa = await empresaRepositories.findById(nfe.id_empresa);

    if (!empresa)
      throw new Error("Empresa não encontrada");

    let nrNFe = 0;

    if (nfe.nr_nfe && nfe.nr_nfe > 0)
      nrNFe = nfe.nr_nfe;
    else {
      nrNFe = empresa.nr_nfe + 1;
      await empresaRepositories.create({ ...empresa, nr_nfe: nrNFe });
      await nfeRepositories.create({ ...nfe, nr_nfe: nrNFe });
    }

    const produtos: IProdutosApiNfe[] = [];

    await Promise.all(
      nfe.pedidos.map(async (item) => {
        let resIbpt = {} as IIbpt;

        await axios.get(`https://apidoni.ibpt.org.br/api/v1/produtos?token=${process.env.TOKEN_IBPT}&cnpj=${process.env.CNPJ_IBPT}&codigo=${item.produto.ncm}&uf=${empresa.cidade.uf.uf}&ex=0&descricao=produto&unidadeMedida=${item.produto.unid_med}&valor=${item.valor_unit}&gtin=sem%20gtin`)
          .then(async (res) => {
            resIbpt = res.data as IIbpt;

            if (resIbpt.Codigo === null) {
              console.log(`NCM ${item.produto.ncm} do produto ${item.produto.nome} não encontrado para cálculo de impostos`);
              throw new Error(`NCM ${item.produto.ncm} do produto ${item.produto.nome} não encontrado para cálculo de impostos`);
            }

            produtos.push({
              cfop: item.produto.cfop,
              codigo: item.produto.id.substring(0, 5),
              imp_estadual: resIbpt.ValorTributoEstadual,
              imp_federal: resIbpt.ValorTributoNacional,
              ncm: item.produto.ncm,
              nome: item.produto.nome,
              quantidade: item.qtd,
              unid_medida: item.produto.unid_med,
              valor_uni: item.valor_unit
            });

            await ncmAliquotaRepositories.create({
              ncm: item.produto.ncm,
              tributo_estadual: resIbpt.ValorTributoEstadual,
              tributo_nacional: resIbpt.ValorTributoNacional
            });

          })
          .catch(async (err) => {
            const cacheAliquota = await ncmAliquotaRepositories.findByNcm(item.produto.ncm);

            if (!cacheAliquota) {
              if (err.response.data.message) {
                console.log(err.response.data.message);
                throw new Error(err.response.data.message);
              } else {
                console.log(`Erro ao buscar aliquota do produto ${item.produto.nome} com NCM ${item.produto.ncm}`);
                throw new Error(`Erro ao buscar aliquota do produto ${item.produto.nome} com NCM ${item.produto.ncm}`);
              }
            } else {
              produtos.push({
                cfop: item.produto.cfop,
                codigo: item.produto.id.substring(0, 5),
                imp_estadual: cacheAliquota.tributo_estadual,
                imp_federal: cacheAliquota.tributo_nacional,
                ncm: item.produto.ncm,
                nome: item.produto.nome,
                quantidade: item.qtd,
                unid_medida: item.produto.unid_med,
                valor_uni: item.valor_unit
              });
            }
          });
      })
    );

    const pgtos: IPgtosApiNfe[] = [];
    nfe.pgtos.map((item) => {
      pgtos.push({
        indpag: 0,
        tpag: ("00" + item.forma_pgto).slice(-2),
        vpag: parseFloat(`${item.valor}`)
      });
    });

    if (nfe.desconto > 0)
      pgtos.push({
        indpag: 0,
        tpag: "05",
        vpag: parseFloat(`${nfe.desconto}`)
      });

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
        data_hora: this.dayjsDateProvider.dateNow(),
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
      produtos,
      pgtos
    }

    const formData = new FormData();

    const certFolder = resolve(__dirname, "..", "..", "..", "..", "..", "archives", "cert");
    // const file = fs.readFileSync(`${certFolder}/${empresa.id}.pfx`, { encoding: 'base64' });
    const file = fs.createReadStream(`${certFolder}/${empresa.id}.pfx`);

    formData.append("json", JSON.stringify(jsonRequest));
    formData.append("certificado", file, { knownLength: fs.statSync(`${certFolder}/${empresa.id}.pfx`).size });

    await axios.post(`${process.env.URL_NFE_PHP}/xml_assinado.php`, formData, {
      headers: {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
      },
    })
      .then(async (res) => {
        if (!res.data || !res.data.xml || !res.data.chave) {
          console.log("Erro ao gerar xml da NFe");
          throw new Error("Erro ao gerar xml da NFe");
        }

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

        await nfeRepositories.create({ ...nfe, chave: res.data.chave, nr_nfe: nrNFe });

        await Queue.add("EnviaLote", { idNfe, cod_cliente });
      })
      .catch(async (err) => {
        if (err.response?.data?.erro)
          await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: err.response.data.erro, status: 0 });
        else
          await nfeRepositories.create({ ...nfe, situacao: "ERRO", motivo: "ERRO AO GERAR XML", status: 0 });
        console.log(err.response);
        throw new Error(err);
      });
  }
}