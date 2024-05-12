import { Module } from '@nestjs/common';
import { ColunaService } from './coluna.service';
import { ColunaController } from './coluna.controller';
import { Coluna } from './entities/coluna.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ColunaController],
  providers: [ColunaService],
  imports: [TypeOrmModule.forFeature([Coluna])],
})
export class ColunaModule {}
