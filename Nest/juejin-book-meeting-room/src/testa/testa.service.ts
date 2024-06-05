import { Injectable } from '@nestjs/common';
import { CreateTestaDto } from './dto/create-testa.dto';
import { UpdateTestaDto } from './dto/update-testa.dto';

@Injectable()
export class TestaService {
  create(createTestaDto: CreateTestaDto) {
    return 'This action adds a new testa';
  }

  findAll() {
    return `This action returns all testa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testa`;
  }

  update(id: number, updateTestaDto: UpdateTestaDto) {
    return `This action updates a #${id} testa`;
  }

  remove(id: number) {
    return `This action removes a #${id} testa`;
  }
}
