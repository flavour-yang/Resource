import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { TransformInterceptor } from 'src/transform.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cats.dto';
import { UpdateCatDto } from './dto/update-cats.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    console.log('findAll...');
    // throw new HttpException('BAD_GATEWAY', HttpStatus.BAD_GATEWAY);
    return await this.catsService.findAll();
  }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.catsService.findById(id);
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.catsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
