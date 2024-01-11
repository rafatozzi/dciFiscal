import { injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";

@injectable()
export class CreateUserUseCase {

  constructor(
    // @inject("UsersRepositories")
    // private usersRepositories: IUsersRepositories
  ) { }

  async execute(cod_cliente: string, data: ICreateUserDTO): Promise<void> {
    const usersRepositories = new UsersRepositories(cod_cliente);
    const alreadyExists = await usersRepositories.findByUser(data.user);

    if (alreadyExists)
      throw new AppError("Usuário já cadastrado");

    const senhaHash = await hash(data.senha, 8);
    data.senha = senhaHash;

    await usersRepositories.create(data);
  }

}