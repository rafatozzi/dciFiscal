import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepositories } from "../../repositories/IUsersRepositories";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject("UsersRepositories")
    private usersRepositories: IUsersRepositories
  ) { }

  async execute(data: ICreateUserDTO): Promise<void> {
    const alreadyExists = await this.usersRepositories.findByUser(data.user);

    if (alreadyExists)
      throw new AppError("Usuário já cadastrado");

    const senhaHash = await hash(data.senha, 8);
    data.senha = senhaHash;

    await this.usersRepositories.create(data);
  }

}