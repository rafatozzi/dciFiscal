import "reflect-metadata";
import { container } from "tsyringe";
import { IEnviaEmailContadorDTO } from "../../dtos/IEnviaEmailContadorDTO";
import { IJobsProps } from "../../dtos/IJobsProps";
import { JobEnviaEmailContadorUseCase } from "./JobEnviaEmailContadorUseCase";

const job: IJobsProps = {
  key: "EnviaEmailContador",
  options: {},
  async handle(queue) {
    const useCase = container.resolve(JobEnviaEmailContadorUseCase);

    const { cod_cliente, idEmpresa, mes, ano } = queue.data as IEnviaEmailContadorDTO;

    await useCase.execute({ cod_cliente, idEmpresa, mes, ano });
  }
}

export default job;