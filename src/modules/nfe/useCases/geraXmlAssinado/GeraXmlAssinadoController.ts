import "reflect-metadata";
import { container } from "tsyringe";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IJobsProps } from "../../dtos/IJobsProps";
import { GeraXmlAssinadoUseCase } from "./GeraXmlAssinadoUseCase";

const job: IJobsProps = {
  key: "GeraXmlAssinado",
  async handle({ idNfe, cod_cliente }: IGeraXmlAssinado) {
    const useCase = container.resolve(GeraXmlAssinadoUseCase);

    console.log("idNFe: ", idNfe);
    console.log("cod_cliente: ", cod_cliente);

    await useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;