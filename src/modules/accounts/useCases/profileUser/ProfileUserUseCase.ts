import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";


@injectable()
export class ProfileUserUseCase {

  constructor(
    @inject("UsersRepositories")
    private userRepositories: UsersRepositories
  ) { }

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepositories.findById(user_id);

    if (!user)
      throw new AppError("Usuário inexistente")

    return user;
  }

}