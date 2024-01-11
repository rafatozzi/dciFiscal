import "reflect-metadata";
import { container } from "tsyringe";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IJobsProps } from "../../dtos/IJobsProps";
import { GeraXmlAssinadoUseCase } from "./GeraXmlAssinadoUseCase";

const job: IJobsProps = {
  key: "GeraXmlAssinado",
  options: {
    delay: 2000,
    attempts: 2,
    backoff: 1000
  },
  async handle(queue) {
    const useCase = container.resolve(GeraXmlAssinadoUseCase);

    const { idNfe, cod_cliente } = queue.data as IGeraXmlAssinado;

    await useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;