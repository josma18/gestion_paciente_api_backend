import { Request, Response } from "express";
import * as pacienteService from "../services/paciente.service";
import { BaseResponse } from "../shared/base-response";
import { MensajeController } from "../shared/constants";
import { Paciente } from "../entities/paciente";


export const insertarPaciente = async (req: Request, res: Response) => {
    try {
        const paciente: Partial<Paciente> = req.body;
        await pacienteService.insertarPaciente(paciente);
        res.json(BaseResponse.success(null, MensajeController.INSERTADO_OK));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const listarPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await pacienteService.listarPacientes();
        res.json(BaseResponse.success(pacientes));
    } catch (error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const listarPacienteId = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const paciente = await pacienteService.listarPacienteId(id);
        res.json(BaseResponse.success(paciente));
    } catch (error) {
          console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const actualizarPaciente = async(req: Request, res: Response) => {
    try {
        req.body.idPaciente = Number(req.params.id); 
        await pacienteService.actualizarPaciente(req.body);
        res.json(BaseResponse.success(null, MensajeController.ACTUALIZADO_OK)); 
    } catch (error) {
          console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const eliminarPaciente = async (req: Request, res: Response) => {
    try {
       const id = Number(req.params.id);
        await pacienteService.eliminarPaciente(id);
        res.json(BaseResponse.success(null, MensajeController.ELIMINADO_OK));

    } catch (error) {
         console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}