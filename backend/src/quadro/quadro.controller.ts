import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { QuadroService } from './quadro.service';
import { CreateQuadroDto } from './dto/create-quadro.dto';
import { UpdateQuadroDto } from './dto/update-quadro.dto';
import { PayloadRequest } from 'src/auth/auth/auth.guard';
import { Usuario } from 'src/usuario/entities/usuario.entity';



@Controller('/quadro')
export class QuadroController {
  constructor(private readonly quadroService: QuadroService) {}

  @Post()
  create(@Body() createQuadroDto: CreateQuadroDto,
        @Request() req: PayloadRequest,
      ) {
    return this.quadroService.create(createQuadroDto, req.usuario.id);
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAll(@Request() req: PayloadRequest) {
    return this.quadroService.findAllByUserId(req.usuario.id);
  }

  @Get('/:id')
  // @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string, @Request() req: PayloadRequest) {
    const quadro = await this.quadroService.findOne(+id, req.usuario.id);
    quadro.colunas = quadro.colunas.sort((a, b) => a.ordem - b.ordem);
    quadro.colunas.forEach((coluna) => {
      coluna.tarefas = coluna.tarefas.sort((a, b) => a.ordem - b.ordem);
    });
    return quadro;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req: PayloadRequest, @Body() updateQuadroDto: UpdateQuadroDto) {
    return this.quadroService.update(+id, req.usuario.id, updateQuadroDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Request() req: PayloadRequest) {
    return this.quadroService.remove(+id, req.usuario.id);
  }
}
