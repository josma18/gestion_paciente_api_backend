import AppDataSource from "../config/appdatasource";
import { Rol } from '../entities/rol';

const repository = AppDataSource.getRepository(Rol);

export const listarRoles = async (): Promise<Rol[]> => {
    return await repository.find({
        order: {
            idRol: "ASC"
        },
    });
};
