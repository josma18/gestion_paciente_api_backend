import { Router } from "express";
import { insertarUsuario, loginUsuario } from "../controllers/usuario.controller";

const router: Router = Router();
router.post('/', insertarUsuario);
router.post('/login', loginUsuario);

export default router;
