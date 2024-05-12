import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistroDto } from './dto/registro.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usuarioService: UsuarioService
  ) {}

  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  async create(@Body() registroDto: RegistroDto) {
    registroDto.email = registroDto.email.toLowerCase();
    const user = await this.usuarioService.create(registroDto);
    if (!user) {
      throw new BadRequestException('Unable to register');
    }
    return this.authService.login({
      email: user.email,
      senha: registroDto.senha,
    });
  }


}
