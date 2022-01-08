import { container, delay } from "tsyringe";

// INTERFACES
import { IUsersRepositories } from "../../modules/accounts/repositories/IUsersRepositories";
import { IUseTokensRepositories } from "../../modules/accounts/repositories/IUseTokensRepositories";

import { IUfRepositories } from "../../modules/uf/repositories/IUfRepositories";
import { ICidadesRespositories } from "../../modules/cidades/repositories/ICidadesRespositories";
import { IEmpresasRepositories } from "../../modules/empresas/repositories/IEmpresasRepositories";
import { IVariantesRepositories } from "../../modules/variantes/repositories/IVariantesRepositories";
import { IVariantesValoresRepositories } from "../../modules/variantes/repositories/IVariantesValoresRepositories";
import { IProdutosRepositories } from "../../modules/produtos/repositories/IProdutosRepositories";
import { IProdutosVariantesRepositories } from "../../modules/produtos/repositories/IProdutosVariantesRepositories";
import { IClientesRepositories } from "../../modules/clientes/repositories/IClientesRepositories";
import { IPedidosRepositories } from "../../modules/pedidos/repositories/IPedidosRepositories";
import { IPedidosPgtosRepositories } from "../../modules/pedidos/repositories/IPedidosPgtosRepositories";
import { IPedidosProdutosRepositories } from "../../modules/pedidos/repositories/IPedidosProdutosRepositories";
import { INfeRepositories } from "../../modules/nfe/repositories/INfeRepositories";
import { INfePgtosRepositories } from "../../modules/nfe/repositories/INfePgtosRepositories";
import { INfeProdutosRepositories } from "../../modules/nfe/repositories/INfeProdutosRepositories";


// REPOSITORIES
import { UsersRepositories } from "../../modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { UserTokensRepositories } from "../../modules/accounts/infra/typeorm/repositories/UserTokensRepositories";

import { UfRepositories } from "../../modules/uf/infra/typeorm/repositories/UfRepositories";
import { CidadesRepositories } from "../../modules/cidades/infra/typeorm/repositories/CidadesRepositories";
import { EmpresasRepositories } from "../../modules/empresas/infra/typeorm/repositories/EmpresasRepositories";
import { VariantesRepositories } from "../../modules/variantes/infra/typeorm/repositories/VariantesRepositories";
import { VariantesValoresRepositories } from "../../modules/variantes/infra/typeorm/repositories/VariantesValoresRepositories";
import { ProdutosRepositories } from "../../modules/produtos/infra/typeorm/repositories/ProdutosRepositories";
import { ProdutosVariantesRepositories } from "../../modules/produtos/infra/typeorm/repositories/ProdutosVariantesRepositories";
import { ClientesRepositories } from "../../modules/clientes/infra/typeorm/repositories/ClientesRepositories";
import { PedidosRepositories } from "../../modules/pedidos/infra/typeorm/repositories/PedidosRepositories";
import { PedidosPgtosRepositories } from "../../modules/pedidos/infra/typeorm/repositories/PedidosPgtosRepositories";
import { PedidosProdutosRepositories } from "../../modules/pedidos/infra/typeorm/repositories/PedidosProdutosRepositories";
import { NfeRepositories } from "../../modules/nfe/infra/typeorm/repositories/NfeRepositories";
import { NfePgtosRepositories } from "../../modules/nfe/infra/typeorm/repositories/NfePgtosRepositories";
import { NfeProdutosRepositories } from "../../modules/nfe/infra/typeorm/repositories/NfeProdutosRepositories";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DaysJsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IUsersRepositories>("UsersRepositories", delay(() => UsersRepositories));
container.registerSingleton<IUseTokensRepositories>("UserTokensRepositories", delay(() => UserTokensRepositories));

container.registerSingleton<IUfRepositories>("UfRepositories", delay(() => UfRepositories));
container.registerSingleton<ICidadesRespositories>("CidadesRepositories", delay(() => CidadesRepositories));
container.registerSingleton<IEmpresasRepositories>("EmpresasRepositories", delay(() => EmpresasRepositories));
container.registerSingleton<IVariantesRepositories>("VariantesRepositories", delay(() => VariantesRepositories));
container.registerSingleton<IVariantesValoresRepositories>("VariantesValoresRepositories", delay(() => VariantesValoresRepositories));
container.registerSingleton<IProdutosRepositories>("ProdutosRepositories", delay(() => ProdutosRepositories));
container.registerSingleton<IProdutosVariantesRepositories>("ProdutosVariantesRepositories", delay(() => ProdutosVariantesRepositories));
container.registerSingleton<IClientesRepositories>("ClientesRepositories", delay(() => ClientesRepositories));
container.registerSingleton<IPedidosRepositories>("PedidosRepositories", delay(() => PedidosRepositories));
container.registerSingleton<IPedidosPgtosRepositories>("PedidosPgtosRepositories", delay(() => PedidosPgtosRepositories));
container.registerSingleton<IPedidosProdutosRepositories>("PedidosProdutosRepositories", delay(() => PedidosProdutosRepositories));
container.registerSingleton<INfeRepositories>("NfeRepositories", delay(() => NfeRepositories));
container.registerSingleton<INfePgtosRepositories>("NfePgtosRepositories", delay(() => NfePgtosRepositories));
container.registerSingleton<INfeProdutosRepositories>("NfeProdutosRepositories", delay(() => NfeProdutosRepositories));

container.registerSingleton<IDateProvider>("DaysJsDateProvider", delay(() => DaysJsDateProvider));


const diskStorage = {
  local: LocalStorageProvider
};

container.registerSingleton<IStorageProvider>("StorageProvider", delay(() => diskStorage[process.env.DISK]));