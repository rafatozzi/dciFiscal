import { container } from "tsyringe";
import { IGeraXmlAssinado } from "../../dtos/IGeraXmlAssinado";
import { IJobsProps } from "../../dtos/IJobsProps";
import { GeraXmlAssinado } from "../../../modules/nfe/useCases/geraXmlAssinado/GeraXmlAssinadoUseCase"

const job: IJobsProps = {
  key: "GeraXmlAssinado",
  handle: async ({ idNfe, cod_cliente }: IGeraXmlAssinado) => {
    const useCase = container.resolve(GeraXmlAssinado);

    useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;