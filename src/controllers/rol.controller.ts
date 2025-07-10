import AppDataSource from "../config/appdatasource";
import { Rol } from "../entities/rol";
import { Request, Response } from "express";
import { BaseResponse } from "../shared/base-response";

const rolRepository = AppDataSource.getRepository(Rol);

export const listarRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rolRepository.find();
        res.json(BaseResponse.success(roles));
    } catch (error) {
        res.status(500).json(BaseResponse.error(error.message));
    }
};
