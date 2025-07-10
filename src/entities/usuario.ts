import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Rol } from "./rol";


@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'usuario', length: 50, unique: true })
    usuario: string;

    @Column({ name: 'password', length: 255 })
    password: string;

    @Column({ name: 'correo', length: 100, nullable: true })
    correo: string;

    @ManyToOne(() => Rol, (rol) => rol.idRol)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;

    @Column({ name: 'estado_auditoria', length: 1, default: () => "'1'" })
    estadoAuditoria: string;

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;
}