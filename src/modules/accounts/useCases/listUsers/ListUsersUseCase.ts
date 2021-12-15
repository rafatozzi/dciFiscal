import { inject, injectable } from "tsyringe";
import { IListUsersResponseDTO } from "../../dtos/IListUsersResponseDTO";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";

@injectable()
export class ListUsersUseCase {

  constructor(
    @inject("UsersRepositories")
    private usersRepositories: UsersRepositories
  ) { }

  async execute(limit?: number, cursor?: number): Promise<IListUsersResponseDTO> {
    const result = await this.usersRepositories.findAll(limit, cursor);

    return result;
  }

}