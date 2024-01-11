import { container } from "tsyringe";
import { IJobsProps } from "../../dtos/IJobsProps";
import { EnviaLoteUseCase } from "./EnviaLoteUseCase";

const job: IJobsProps = {
  key: "EnviaLote",
  options: {
    delay: 1000
  },
  async handle(queue) {
    const useCase = container.resolve(EnviaLoteUseCase);

    const { idNfe, cod_cliente } = queue.data;

    await useCase.execute({ idNfe, cod_cliente });
  }
}

export default job;