import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('especialidades')
export class Especialidad {
    @PrimaryGeneratedColumn({ name: 'id_especialidad' })
    idEspecialidad: number;

    @Column({ name: 'nombre_especialidad', length: 100, unique: true })
    nombreEspecialidad: string;

    @Column({ name: 'descripcion', type: 'text', nullable: true })
    descripcion: string;

    @Column({ name: 'estado_auditoria', length: 1, default: () => "'1'" })
    estadoAuditoria: string;

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    
}