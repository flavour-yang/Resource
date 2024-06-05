import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestaService } from './testa.service';
import { CreateTestaDto } from './dto/create-testa.dto';
import { UpdateTestaDto } from './dto/update-testa.dto';

@Controller('testa')
export class TestaController {
  constructor(private readonly testaService: TestaService) {}

  @Post()
  create(@Body() createTestaDto: CreateTestaDto) {
    return this.testaService.create(createTestaDto);
  }

  @Get('all')
  findAll() {
    return this.testaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestaDto: UpdateTestaDto) {
    return this.testaService.update(+id, updateTestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testaService.remove(+id);
  }
}
