
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn({ name: 'id_rol' })
    idRol: number;

    @Column({ name: 'nombre_rol'})
    nombreRol: string;

    @Column({ name: 'descripcion' })
    descripcion: string;

    @Column({ name: 'estado_auditoria' })
    estadoAuditoria: string;

    @Column({ name: 'fecha_registro' })
    fechaRegistro: Date;
}