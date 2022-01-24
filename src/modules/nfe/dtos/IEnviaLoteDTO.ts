import { IEmpresaApiNfe } from "./IEmpresaApiNfe";
import { IInfoNfe } from "./IInfoNfe";

export interface IEnviaLoteDTO {
  senha_certificado: string;
  empresa: IEmpresaApiNfe;
  info_nfe: IInfoNfe;
  xml: string;
}