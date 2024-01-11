import { Router } from "express";

import multer from "multer";
import uploadConfig from "../../../../config/upload";

import { CreateEmpresaController } from "../../../../modules/empresas/useCases/createEmpresa/CreateEmpresaController";
import { DeleteEmpresaController } from "../../../../modules/empresas/useCases/deleteEmpresa/deleteEmpresaController";
import { FindByIdController } from "../../../../modules/empresas/useCases/findById/FindByIdController";
import { ListEmpresasController } from "../../../../modules/empresas/useCases/listEmpresas/ListEmpresasController";
import { UploadCertificadoController } from "../../../../modules/empresas/useCases/uploadCertificado/UploadCertificadoController";
import { EnsureAdmin } from "../middlewares/ensureAdmin";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createEmpresa = new CreateEmpresaController();
const deleteEmpresa = new DeleteEmpresaController();
const findById = new FindByIdController();
const listEmpresas = new ListEmpresasController();
const uploadCertificadoController = new UploadCertificadoController();

const uploadCert = multer(uploadConfig)

const empresaRoutes = Router();

empresaRoutes.get("/", EnsureAuthenticated, listEmpresas.handle);
empresaRoutes.post("/findAll", EnsureAuthenticated, listEmpresas.handle);

empresaRoutes.get("/:id", EnsureAuthenticated, findById.handle);

empresaRoutes.post("/", EnsureAuthenticated, createEmpresa.handle);

empresaRoutes.delete("/", EnsureAuthenticated, EnsureAdmin, deleteEmpresa.handle);

empresaRoutes.patch("/certificado", EnsureAuthenticated, uploadCert.single("cert"), uploadCertificadoController.handle);

export { empresaRoutes };