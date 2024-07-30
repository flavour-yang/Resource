import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((m) => this.preloadFlavorByName(m)),
    );
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
    // const existingCoffee = this.findOne(id);
    // if (existingCoffee) {
    // }
  }
  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner(); // 创建数据库链接

    await queryRunner.connect();
    await queryRunner.startTransaction();
    // 实现对数据库的多个操作
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (error) {
      // 捕获错误, 回滚事务防止数据库出现不一致
      await queryRunner.rollbackTransaction();
    } finally {
      // 关闭 queryRunner
      await queryRunner.release();
    }
  }

  async create(data: CreateCoffeeDto) {
    const flavors = await Promise.all(
      data.flavors.map((m) => this.preloadFlavorByName(m)),
    );
    const coffee = this.coffeeRepository.create({ ...data, flavors });
    return this.coffeeRepository.save(coffee);
  }
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlaovr = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlaovr) {
      return existingFlaovr;
    }
    return this.flavorRepository.create({ name });
  }
}
