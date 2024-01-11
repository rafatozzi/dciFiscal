import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IResetPassword } from "../../dtos/IResetPassword";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";
import { UserTokensRepositories } from "../../infra/typeorm/repositories/UserTokensRepositories";

@injectable()
export class ResetPasswordUseCase {

  constructor(
    // @inject("UsersRepositories")
    // private usersRepositories: UsersRepositories,
    // @inject("UserTokensRepositories")
    // private userTokensRepositories: UserTokensRepositories,
    @inject("DaysJsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(cod_cliente: string, data: IResetPassword): Promise<void> {
    const userTokensRepositories = new UserTokensRepositories(cod_cliente);
    const usersRepositories = new UsersRepositories(cod_cliente);

    const userToken = await userTokensRepositories.findByRefreshToken(data.token);

    if(!data.senha)
      throw new AppError("Nova senha não informada");

    if (!userToken)
      throw new AppError("Token inválido");

    if (this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow()))
      throw new AppError("Token expirado");

    const user = await usersRepositories.findById(userToken.user_id);

    user.senha = await hash(data.senha, 8);

    await usersRepositories.create(user);
    await userTokensRepositories.deleteById(userToken.id);
  }

}