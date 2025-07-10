import AppDataSource from "../config/appdatasource";
import { Usuario } from "../entities/usuario";
import { Rol } from "../entities/rol";
import { EstadoAuditoria } from "../enums/EstadoAuditoria";
import { encryptPassword } from "../shared/util";

const repository = AppDataSource.getRepository(Usuario);
const rolRepository = AppDataSource.getRepository(Rol);

export const insertarUsuario = async (usuario: Partial<Usuario>) => {
    usuario.password = await encryptPassword(usuario.password || '123456');

    if (usuario.rol && typeof usuario.rol === "number") {
        const rol = await rolRepository.findOneBy({ idRol: usuario.rol });
        if (!rol) throw new Error("Rol no encontrado");
        usuario.rol = rol;
    }

    return await repository.save(usuario);
}

export const obtenerUsuarioPorRol = async (usuario: string, idRol: number) => {
    return await repository.findOne({
        where: {
            usuario: usuario,
            rol: {
                idRol: idRol
            },
            estadoAuditoria: EstadoAuditoria.ACTIVO
        },
        relations: {
            rol: true
        }
    });
};
