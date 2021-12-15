import { container, delay } from "tsyringe";

import { IUsersRepositories } from "../../modules/accounts/repositories/IUsersRepositories";
import { IUseTokensRepositories } from "../../modules/accounts/repositories/IUseTokensRepositories";

import { IUfRepositories } from "../../modules/uf/repositories/IUfRepositories";
import { ICidadesRespositories } from "../../modules/cidades/repositories/ICidadesRespositories";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";

import { UsersRepositories } from "../../modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { UserTokensRepositories } from "../../modules/accounts/infra/typeorm/repositories/UserTokensRepositories";

import { UfRepositories } from "../../modules/uf/infra/typeorm/repositories/UfRepositories";
import { CidadesRepositories } from "../../modules/cidades/infra/typeorm/repositories/CidadesRepositories";

import { DaysJsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IUsersRepositories>("UsersRepositories", delay(() => UsersRepositories));
container.registerSingleton<IUseTokensRepositories>("UserTokensRepositories", delay(() => UserTokensRepositories));

container.registerSingleton<IUfRepositories>("UfRepositories", delay(() => UfRepositories));
container.registerSingleton<ICidadesRespositories>("CidadesRepositories", delay(() => CidadesRepositories));

container.registerSingleton<IDateProvider>("DaysJsDateProvider", delay(() => DaysJsDateProvider));