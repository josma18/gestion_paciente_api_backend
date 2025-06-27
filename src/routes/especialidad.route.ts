import { Router } from 'express';
import {listarEspecialidades} from '../controllers/especialidad.controller';

const router: Router = Router();

router.get('/', listarEspecialidades); //Solo listar ya que solo queremos que el spinner traiga los datos.

export default router;
