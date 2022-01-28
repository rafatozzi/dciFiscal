import "reflect-metadata";
import { container } from "tsyringe";
import { IImportaXmlDTO } from "../../dtos/IImportaXmlDTO";
import { IJobsProps } from "../../dtos/IJobsProps";
import { JobImportaXmlUseCase } from "./JobImportaXmlUseCase";

const job: IJobsProps = {
  key: "ImportaXml",
  options: {},
  async handle(queue) {
    const useCase = container.resolve(JobImportaXmlUseCase);

    const { cod_cliente, filePath } = queue.data as IImportaXmlDTO;

    await useCase.execute({ cod_cliente, filePath });
  }
}

export default job;