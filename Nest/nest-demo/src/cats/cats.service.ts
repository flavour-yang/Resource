import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}
  create(createCatDto: CreateCatDto) {
    // createCatDto.username =
    // createCatDto.password
    // createCatDto.realname
    // createCatDto.state
    return this.catRepository.create(createCatDto);
  }

  async findAll() {
    return await this.catRepository.find();
    // return `This action returns all cats`;
  }

  async findOne(id: number) {
    return await this.catRepository.findBy({ id });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
