import { Router } from "express";
import {
    insertarMedico,
    listarMedicos,
    listarMedicoId,
    actualizarMedico,
    eliminarMedico
} from "../controllers/medico.controller";

const router: Router = Router();

router.post('/', insertarMedico);
router.get('/', listarMedicos);
router.get('/:id', listarMedicoId);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

export default router;