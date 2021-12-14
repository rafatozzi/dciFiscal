import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IResetPassword } from "../../dtos/IResetPassword";
import { UsersRepositories } from "../../infra/typeorm/repositories/UsersRepositories";
import { UserTokensRepositories } from "../../infra/typeorm/repositories/UserTokensRepositories";

injectable()
export class ResetPasswordUseCase {

  constructor(
    @inject("UsersRepositories")
    private usersRepositories: UsersRepositories,
    @inject("UserTokensRepositories")
    private userTokensRepositories: UserTokensRepositories,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(data: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepositories.findByRefreshToken(data.token);

    if (!userToken)
      throw new AppError("Token inválido");

    if (this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow()))
      throw new AppError("Token expirado");

    const user = await this.usersRepositories.findById(userToken.user_id);

    user.senha = await hash(data.senha, 8);

    await this.usersRepositories.create(user);
    await this.userTokensRepositories.deleteById(userToken.id);
  }

}