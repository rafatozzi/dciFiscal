import { container } from "tsyringe";
import { IJobsProps } from "../../dtos/IJobsProps";
import { ConsultaNfeUseCase } from "./ConsultaNfeUseCase";

const job: IJobsProps = {
  key: "ConsultaNfe",
  options: {
    delay: 2000,
    limiter: {
      max: 600,
      duration: 300000
    }
  },
  async handle(queue) {
    const useCase = container.resolve(ConsultaNfeUseCase);

    const { idNfe, cod_cliente } = queue.data;

    await useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;