import AppDataSource from "../config/appdatasource";
import { Paciente } from "../entities/paciente";

const repository = AppDataSource.getRepository(Paciente);


export const insertarPaciente = async (paciente: Partial<Paciente>) => {
    await repository.save(paciente);
}


export const listarPacientes = async (): Promise<Paciente[]> => {
    return await repository.find({
        order: {
            idPaciente: "ASC" // opcional: para ordenarlos por ID
        }
    });
}


export const listarPacienteId = async (id:number): Promise<Paciente | null> => {
    return await repository.findOneBy({idPaciente:id});
}


export const actualizarPaciente = async (paciente: Partial<Paciente>) => {
    if (!paciente.idPaciente) throw new Error("id del paciente es obligatorio")
    await repository.update({ idPaciente: paciente.idPaciente}, paciente);
}


export const eliminarPaciente = async (id:number) => {
    await repository.delete({idPaciente:id});
}