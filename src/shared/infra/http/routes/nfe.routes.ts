import { Router } from "express";
import { CreateNfeController } from "../../../../modules/nfe/useCases/createNfe/CreateNfeController";
import { CreateNfePgtosController } from "../../../../modules/nfe/useCases/createNfePgtos/CreateNfePgtosController";
import { CreateNfeProdutosController } from "../../../../modules/nfe/useCases/createNfeProdutos/CreateNfeProdutosController";
import { DeleteNfeController } from "../../../../modules/nfe/useCases/deleteNfe/DeleteNfeController";
import { DeleteNfePgtosController } from "../../../../modules/nfe/useCases/deleteNfePgtos/DeleteNfePgtosController";
import { DeleteNfeProdutosController } from "../../../../modules/nfe/useCases/deleteNfeProdutos/DeleteNfeProdutosController";
import { FindAllNfeController } from "../../../../modules/nfe/useCases/findAllNfe/FindAllNfeController";
import { FindByIdNfeController } from "../../../../modules/nfe/useCases/findByIdNfe/FindByIdNfeController";
import { EmitirNfeController } from "../../../../modules/nfe/useCases/emitirNfe/EmitirNfeController";
import { SolicitarCancelController } from "../../../../modules/nfe/useCases/solicitarCancel/SolicitarCancelController";
import { ImportarXmlController } from "../../../../modules/nfe/useCases/importarXml/ImportarXmlController";
import { EnviaEmailContadorController } from "../../../../modules/nfe/useCases/enviaEmailContador/EnviaEmailContadorController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import uploadConfig from "../../../../config/upload";

const createNfe = new CreateNfeController();
const createNfePgtos = new CreateNfePgtosController();
const createNfeProdutos = new CreateNfeProdutosController();
const deleteNfe = new DeleteNfeController();
const deleteNfePgtos = new DeleteNfePgtosController();
const deleteNfeProdutos = new DeleteNfeProdutosController();
const findAllNfe = new FindAllNfeController();
const findByIdNfe = new FindByIdNfeController();
const emitirNfe = new EmitirNfeController();
const solicitarCancel = new SolicitarCancelController();
const importarXmlController = new ImportarXmlController();
const enviaEmailContadorController = new EnviaEmailContadorController();

const uploadXml = multer(uploadConfig)

const nfeRoutes = Router();

nfeRoutes.get("/", EnsureAuthenticated, findAllNfe.handle);
nfeRoutes.post("/findAll", EnsureAuthenticated, findAllNfe.handle);
nfeRoutes.get("/:id", EnsureAuthenticated, findByIdNfe.handle);

nfeRoutes.post("/", EnsureAuthenticated, createNfe.handle);
nfeRoutes.post("/pgtos", EnsureAuthenticated, createNfePgtos.handle);
nfeRoutes.post("/produtos", EnsureAuthenticated, createNfeProdutos.handle);

nfeRoutes.delete("/", EnsureAuthenticated, deleteNfe.handle);
nfeRoutes.delete("/pgtos", EnsureAuthenticated, deleteNfePgtos.handle);
nfeRoutes.delete("/produtos", EnsureAuthenticated, deleteNfeProdutos.handle);

nfeRoutes.delete("/cancelar", EnsureAuthenticated, solicitarCancel.handle);

nfeRoutes.post("/emitir", EnsureAuthenticated, emitirNfe.handle);

nfeRoutes.post("/importar", EnsureAuthenticated, uploadXml.array("xml"), importarXmlController.handle);

nfeRoutes.post("/envia_contabilidade", EnsureAuthenticated, enviaEmailContadorController.handle);

export { nfeRoutes };