import { createConnections } from "typeorm";

interface IOptions {
  host: string;
}

createConnections();

// getConnectionOptions().then((options) => {
//   // const newOptions = options as IOptions;
//   // newOptions.host = "database"; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados no docker-compose
//   createConnection({ ...options });
// });