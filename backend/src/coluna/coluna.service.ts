import { Get, Injectable } from '@nestjs/common';
import { CreateColunaDto } from './dto/create-coluna.dto';
import { UpdateColunaDto } from './dto/update-coluna.dto';
import { Coluna } from './entities/coluna.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColunaService {
  usuarioRepositorio: any;

  constructor(
    
    @InjectRepository(Coluna)
    private colunaRepositorio: Repository<Coluna>,
        
  ){  }


  create(createColunaDto: CreateColunaDto) {
    const coluna = new Coluna();
    coluna.nome = createColunaDto.nome;
    coluna.quadroId = createColunaDto.quadroId;
  

    return this.colunaRepositorio.save(createColunaDto);
  }

  
  findByQuadroId(quadroId : number) {
    return this.colunaRepositorio.find({
      where: {quadroId},
    } );
  }

  update(id: number, updateColunaDto: UpdateColunaDto) {
    return this.colunaRepositorio.update(   
      id, {
        nome : updateColunaDto.nome,
        
      });
  }

  remove(id: number) {
    return this.colunaRepositorio.delete(id);
  }
}
