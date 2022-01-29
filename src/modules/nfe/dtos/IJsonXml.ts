export interface IJsonXmlEnderecos {
  xLgr: string;
  nro: string;
  xBairro: string;
  cMun: number;
  xMun: string;
  UF: string;
  CEP: number;
  cPais: number;
  xPais: string;
  fone: number;
}

export interface IJsonXmlPgtos {
  indPag: number;
  tPag: string;
  vPag: number;
}

export interface IJsonXmlProdutos {
  nItem: number;
  prod: {
    cProd: string;
    cEAN: string;
    xProd: string;
    NCM: string;
    CFOP: number;
    uCom: string;
    qCom: number;
    vUnCom: number;
    vProd: number;
    cEANTrib: string;
    uTrib: string;
    qTrib: number;
    vUnTrib: number;
    indTot: number;
  };
  imposto: {
    vTotTrib: string;
    ICMS: {
      ICMSSN102: {
        orig: string;
        CSOSN: string;
      }
    };
    PIS: {
      PISOutr: {
        CST: number;
        qBCProd: number;
        vAliqProd: number;
        vPIS: number;
      }
    };
    COFINS: {
      COFINSOutr: {
        CST: number;
        qBCProd: number;
        vAliqProd: number;
        vCOFINS: number;
      }
    }
  }
}

export interface IJsonXmlTransform {
  Algorithm: string;
}

export interface IJsonXml {
  nfeProc: {
    versao: string;
    xmlns: string;
    NFe: {
      xmlns: string;
      infNFe: {
        Id: string;
        versao: string;
        ide: {
          cUF: string;
          cNF: string;
          natOp: string;
          mod: number;
          serie: number;
          nNF: number;
          dhEmi: Date;
          tpNF: number;
          idDest: number;
          cMunFG: number;
          tpImp: number;
          tpEmis: number;
          cDV: number;
          tpAmb: number;
          finNFe: number;
          indFinal: number;
          indPres: number;
          procEmi: number;
          verProc: string;
        };
        emit: {
          CNPJ: number;
          xNome: string;
          xFant: string;
          enderEmit: IJsonXmlEnderecos;
          IE: number;
          CRT: number;
        };
        dest: {
          CPF: number | null;
          CNPJ: number | null;
          xNome: string;
          enderDest: IJsonXmlEnderecos;
          indIEDest: number;
          IE: number | null;
        };
        det: IJsonXmlProdutos[] | IJsonXmlProdutos;
        total: {
          ICMSTot: {
            vBC: number;
            vICMS: number;
            vICMSDeson: number;
            vFCP: number;
            vBCST: number;
            vST: number;
            vFCPST: number;
            vFCPSTRet: number;
            vProd: number;
            vFrete: number;
            vSeg: number;
            vDesc: number;
            vII: number;
            vIPI: number;
            vIPIDevol: number;
            vPIS: number;
            vCOFINS: number;
            vOutro: number;
            vNF: number;
            vTotTrib: number;
          }
        };
        transp: {
          modFrete: number;
        };
        pag: {
          detPag: IJsonXmlPgtos[] | IJsonXmlPgtos;
          vTroco: number;
        };
        infAdic: any;
        infRespTec: {
          CNPJ: number;
          xContato: string;
          email: string;
          fone: number;
        }
      };
      Signature: {
        xmlns: string;
        SignedInfo: {
          CanonicalizationMethod: {
            Algorithm: string;
          };
          SignatureMethod: {
            Algorithm: string;
          };
          Reference: {
            URI: string;
            Transforms: {
              Transform: IJsonXmlTransform[];
            };
            DigestMethod: {
              Algorithm: string;
            };
            DigestValue: string;
          }
        };
        SignatureValue: string;
        KeyInfo: {
          X509Data: {
            X509Certificate: string;
          }
        }
      }
    };
    protNFe: {
      versao: string;
      infProt: {
        tpAmb: number;
        verAplic: string;
        chNFe: string;
        dhRecbto: Date;
        nProt: string;
        digVal: string;
        cStat: number;
        xMotivo: string;
      }
    }
  }
}