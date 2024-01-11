import { IEmpresaApiNfe } from "./IEmpresaApiNfe";
import { IInfoNfe } from "./IInfoNfe";

export interface ICancelaNfeDTO {
  senha_certificado: string;
  empresa: IEmpresaApiNfe;
  info_nfe: IInfoNfe;
  chave: string;
  justificativa: string;
  nrProtocolo: string;
}