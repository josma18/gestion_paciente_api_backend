// src/shared/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(403).json({ mensaje: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // Si deseas, puedes pasar el usuario al request
    req.body.usuarioLogueado = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};