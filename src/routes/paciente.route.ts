import { Router } from "express";
import { insertarPaciente, listarPacientes, eliminarPaciente,listarPacienteId, actualizarPaciente} from "../controllers/paciente.controller";

const router: Router = Router();
router.post('/', insertarPaciente);
router.get('/', listarPacientes);
router.get('/:id',listarPacienteId);
router.put('/:id',actualizarPaciente);
router.delete('/:id',eliminarPaciente);
export default router;