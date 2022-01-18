import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IJobsProps } from "../../dtos/IJobsProps";

const job: IJobsProps = {
  key: "geraXmlAssinado",
  handle: async ({ idNfe }: IGeraXmlAssinado) => { }
  // async handle({ idNfe }: IGeraXmlAssinado) { }
}

export default job;