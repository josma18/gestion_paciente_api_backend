import AppDataSource from "../config/appdatasource";
import { Especialidad } from '../entities/especialidad';

const repository = AppDataSource.getRepository(Especialidad);

export const listarEspecialidades = async (): Promise<Especialidad[]> => {
    return await repository.find({
        order: {
            idEspecialidad: "ASC"
        },
        //relations: ["usuario", "especialidad"] // si estás usando relaciones
    });
};
