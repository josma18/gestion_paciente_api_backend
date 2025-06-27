import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Especialidad } from "./especialidad";

@Entity('medicos')
export class Medico {
    @PrimaryGeneratedColumn({ name: 'id_medico' })
    idMedico: number;

    @Column({ name: 'nombres', length: 100 })
    nombres: string;

    @Column({ name: 'apellido_paterno', length: 100 })
    apellidoPaterno: string;

    @Column({ name: 'apellido_materno', length: 100 })
    apellidoMaterno: string;

    @Column({ name: 'tipo_documento', length: 20, nullable: true })
    tipoDocumento: string;

    @Column({ name: 'numero_documento', length: 20, unique: true })
    numeroDocumento: string;

    @Column({ name: 'direccion', length: 150, nullable: true })
    direccion: string;

    @Column({ name: 'telefono', length: 20, nullable: true })
    telefono: string;

    @ManyToOne(() => Especialidad)
    @JoinColumn({ name: 'id_especialidad' })
    especialidad: Especialidad;

    @Column({ name: 'estado_auditoria', length: 1, default: () => "'1'" })
    estadoAuditoria: string;

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;
}