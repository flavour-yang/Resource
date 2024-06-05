import { Module } from '@nestjs/common';
import { TestaService } from './testa.service';
import { TestaController } from './testa.controller';

@Module({
  controllers: [TestaController],
  providers: [TestaService]
})
export class TestaModule {}
