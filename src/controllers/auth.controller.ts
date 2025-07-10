import { Request, Response } from "express";
import { Usuario } from "../entities/usuario";
import AppDataSource from "../config/appdatasource";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<any> => {
  const { usuario, password } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(Usuario); 
    const usuarioEncontrado = await userRepo.findOne({ where: { usuario } });

      if (!usuarioEncontrado)
          return res.status(404).json({ mensaje: "Usuario no encontrado" });

      if (password !== usuarioEncontrado.password) {
          return res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }

      const payload = {
          id: usuarioEncontrado.idUsuario,
          usuario: usuarioEncontrado.usuario,
      };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};