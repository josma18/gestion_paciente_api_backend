import { Request, Response } from "express";
import * as medicoService from "../services/medico.service";
import { BaseResponse } from "../shared/base-response";
import { MensajeController } from "../shared/constants";
import { Medico } from "../entities/medico";

export const insertarMedico = async (req: Request, res: Response) => {
    try {
        const medico: Partial<Medico> & { idEspecialidad: number } = req.body;
        await medicoService.insertarMedico(medico);
        res.json(BaseResponse.success(null, MensajeController.INSERTADO_OK));
    } catch (error) { 
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const listarMedicos = async (req: Request, res: Response) => {
    try {
        const medicos = await medicoService.listarMedicos();
        res.json(BaseResponse.success(medicos));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const listarMedicoId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const medico = await medicoService.listarMedicoId(id);
        res.json(BaseResponse.success(medico));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const actualizarMedico = async (req: Request, res: Response) => {
    try {
        req.body.idMedico = Number(req.params.id);
        await medicoService.actualizarMedico(req.body);
        res.json(BaseResponse.success(null, MensajeController.ACTUALIZADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

export const eliminarMedico = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await medicoService.eliminarMedico(id);
        res.json(BaseResponse.success(null, MensajeController.ELIMINADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};