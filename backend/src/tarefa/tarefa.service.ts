import { Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TarefaService {

  constructor(
    
    @InjectRepository(Tarefa)
    private tarefaRepositorio: Repository<Tarefa>,
        
  ){  }
  
  create(createTarefaDto: CreateTarefaDto) {
    const tarefa = new Tarefa();
    
    tarefa.titulo = createTarefaDto.titulo;
    tarefa.conteudo = createTarefaDto.conteudo;
    tarefa.destinatarioId = createTarefaDto.destinatarioId;
    tarefa.colunaId = createTarefaDto.colunaId;

    return this.tarefaRepositorio.save(createTarefaDto);
  }

  findAll() {
    return `This action returns all tarefa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarefa`;
  }

  update(id: number, updateTarefaDto: UpdateTarefaDto) {
    return `This action updates a #${id} tarefa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarefa`;
  }
}
