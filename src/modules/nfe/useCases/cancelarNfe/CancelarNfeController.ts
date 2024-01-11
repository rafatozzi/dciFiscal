import { container } from "tsyringe";
import { IJobsProps } from "../../dtos/IJobsProps";
import { CancelaNfeUseCase } from "./CancelarNfeUseCase";

const job: IJobsProps = {
  key: "CancelaNfe",
  async handle(queue) {

    const useCase = container.resolve(CancelaNfeUseCase);

    const { idNfe, cod_cliente, motivo } = queue.data;

    await useCase.execute({ idNfe, cod_cliente, motivo });
  }
}

export default job;