import 'dotenv/config';
import { DataSource } from "typeorm";
import { Paciente } from "../entities/paciente";
import { Medico } from "../entities/medico";
import { Usuario } from "../entities/usuario";
import { Especialidad } from "../entities/especialidad";
import { Rol } from '../entities/rol';

const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'nombre_base',
    entities: [Paciente, Medico, Especialidad, Usuario, Rol],
    synchronize: false,
});

export default AppDataSource;
