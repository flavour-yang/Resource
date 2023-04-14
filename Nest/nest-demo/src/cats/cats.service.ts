import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cats.dto';
import { UpdateCatDto } from './dto/update-cats.dto';
import { Cats } from './entities/cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catRepository: Repository<Cats>,
  ) {}
  create(createCatDto: CreateCatDto) {
    // createCatDto.username =
    // createCatDto.password
    // createCatDto.realname
    // createCatDto.state
    return this.catRepository.create(createCatDto);
  }

  async findAll() {
    const res = await this.catRepository.find();
    return res;
    // return `This action returns all cats`;
  }

  // async findById(id) {
  //   return await this.catRepository.findOne(id);
  // }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({ id });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cats`;
  }

  remove(id: number) {
    return `This action removes a #${id} cats`;
  }
}
