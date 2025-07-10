import { Router } from 'express';
import {listarRoles} from '../controllers/rol.controller';

const router: Router = Router();

router.get('/', listarRoles); //Solo listar ya que solo queremos que el spinner traiga los datos.

export default router;
