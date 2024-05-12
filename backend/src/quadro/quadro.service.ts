import { Injectable } from '@nestjs/common';
import { CreateQuadroDto } from './dto/create-quadro.dto';
import { UpdateQuadroDto } from './dto/update-quadro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quadro } from './entities/quadro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuadroService {

  constructor(
    
    @InjectRepository(Quadro)
    private quadroRepositorio: Repository<Quadro>,
        
  ){  }
  create(createQuadroDto: CreateQuadroDto, usuarioId: number) {
    const quadro = new Quadro();
    quadro.nome = createQuadroDto.nome;
    return this.quadroRepositorio.save(createQuadroDto);
  }
  findAllByUserId(userId: number) {
    return this.quadroRepositorio.find({
      where: { usuarios: { id: userId } },
      relations: ['usuarios'],
    });
  }
  findOne(id: number, usuarioId: number) {
    return this.quadroRepositorio.findOne({
      where: {
        id,
        usuarios: { id: usuarioId },
      },
      relations: ['usuarios', 'colunas', 'colunas.tarefas'],
    });
  }

  update(id: number, usuarioId : number, updateQuadroDto: UpdateQuadroDto) {
    return this.quadroRepositorio.update(
      {id,
        usuarios: {
          id: usuarioId,
        }}, {
      nome : updateQuadroDto.nome,
    })
    
  }

  remove(id: number, usuarioId:number) {
    return this.quadroRepositorio.delete(id);
  }
}
