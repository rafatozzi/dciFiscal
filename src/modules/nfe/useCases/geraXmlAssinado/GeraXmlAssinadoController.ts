import { container } from "tsyringe";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IJobsProps } from "../../dtos/IJobsProps";
import { GeraXmlAssinadoUseCase } from "./GeraXmlAssinadoUseCase";

const job: IJobsProps = {
  key: "GeraXmlAssinado",
  handle: async ({ idNfe, cod_cliente }: IGeraXmlAssinado) => {
    const useCase = container.resolve(GeraXmlAssinadoUseCase);

    useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;