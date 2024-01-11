import { injectable } from "tsyringe";
import { IListUsersResponseDTO } from "../../dtos/IListUsersResponseDTO";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";

@injectable()
export class ListUsersUseCase {

  constructor(
    // @inject("UsersRepositories")
    // private usersRepositories: UsersRepositories
  ) { }

  async execute(cod_cliente: string, limit?: number, cursor?: number): Promise<IListUsersResponseDTO> {
    const usersRepositories = new UsersRepositories(cod_cliente);
    const result = await usersRepositories.findAll(limit, cursor);

    return result;
  }

}