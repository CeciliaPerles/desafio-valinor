import { Coluna } from "src/coluna/entities/coluna.entity";
import { Quadro } from "src/quadro/entities/quadro.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarefa {


    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    titulo : string;

    @Column()
    ordem: number;

    @Column()
    conteudo : string;

    @Column()
    destinatarioId : number;

    @Column()
    colunaId : number;

    @ManyToOne(()=> Usuario, (usuario) => usuario.tarefas)
    @JoinColumn()
    destinatario : Usuario;

    //Uma coluna pode ter muitas tarefas
    
    @ManyToOne(()=> Coluna, (coluna) => coluna.tarefas)
    @JoinColumn()
    coluna : Coluna;

}
