import { Coluna } from "src/coluna/entities/coluna.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quadro {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nome : string;

    @ManyToOne(()=> Usuario, (usuario) => usuario.quadros)
    usuarios : Usuario[];
    
    @OneToMany(() => Coluna, (coluna)=> coluna.quadro)
    colunas: Coluna[];
}