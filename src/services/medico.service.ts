    import AppDataSource from "../config/appdatasource";
import { Especialidad } from "../entities/especialidad";
    import { Medico } from "../entities/medico";

    const repository = AppDataSource.getRepository(Medico);

    export const insertarMedico = async (medicoData: Partial<Medico> & { idEspecialidad: number }) => {
    const medico = new Medico();

    // Copia campos
    medico.nombres = medicoData.nombres;
    medico.apellidoPaterno = medicoData.apellidoPaterno;
    medico.apellidoMaterno = medicoData.apellidoMaterno;
    medico.tipoDocumento = medicoData.tipoDocumento;
    medico.numeroDocumento = medicoData.numeroDocumento;
    medico.direccion = medicoData.direccion;
    medico.telefono = medicoData.telefono;
    medico.estadoAuditoria = medicoData.estadoAuditoria;
    medico.fechaRegistro = medicoData.fechaRegistro ?? new Date();

    // Relación correcta
    medico.especialidad = { idEspecialidad: medicoData.idEspecialidad } as Especialidad;

    // Usuario si deseas usarlo también (opcional)
    if (medicoData.usuario) {
        medico.usuario = medicoData.usuario;
    }

    await repository.save(medico);
};

    export const listarMedicos = async (): Promise<Medico[]> => {
        return await repository.find({
            order: {
                idMedico: "ASC"
            },
            relations: ["usuario", "especialidad"] // si estás usando relaciones
        });
    };

    export const listarMedicoId = async (id: number): Promise<Medico | null> => {
        return await repository.findOne({
            where: { idMedico: id },
            relations: ["usuario", "especialidad"]
        });
    };

    export const actualizarMedico = async (medico: Partial<Medico>) => {
        if (!medico.idMedico) throw new Error("id del médico es obligatorio");
        await repository.update({ idMedico: medico.idMedico }, medico);
    };

    export const eliminarMedico = async (id: number) => {
        await repository.delete({ idMedico: id });
    };