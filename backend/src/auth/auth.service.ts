import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegistroDto } from './dto/registro.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {


  
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
        
  ){}
  async login(loginDto: LoginDto) {
     const usuario = await this.usuarioRepositorio.findOne({
      where: {
        email: loginDto.email,
        
      },
    });
   

    if(!usuario){
      throw new NotFoundException('Usuário não encontrado');
    }

    if(loginDto.senha !== usuario.senha){
      throw new UnauthorizedException('Login inválido')
    }

    return {
      usuarioId: usuario.id
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, registroDto: RegistroDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
