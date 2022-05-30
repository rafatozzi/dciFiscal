import { Router } from "express";
import { CreateNcmAliquotasController } from "../../../../modules/NcmAliquotas/useCases/createNcmAliquotas/CreateNcmAliquotasController";
import { FindNcmAliquotaByNcmController } from "../../../../modules/NcmAliquotas/useCases/findNcmAliquotaByNcm/FindNcmAliquotaByNcmController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const createNcmAliquotas = new CreateNcmAliquotasController();
const findByNcm = new FindNcmAliquotaByNcmController();

const aliquotasRoutes = Router();

aliquotasRoutes.post("/", EnsureAuthenticated, createNcmAliquotas.handle);

aliquotasRoutes.get("/:ncm", EnsureAuthenticated, findByNcm.handle);

export { aliquotasRoutes };