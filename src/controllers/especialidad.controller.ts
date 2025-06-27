import { Request, Response } from 'express';
import * as especialidadService from '../services/especialidad.service';
import { BaseResponse } from '../shared/base-response';


export const listarEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await especialidadService.listarEspecialidades();
        res.json(BaseResponse.success(especialidades));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};
