import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreak Roast',
      brand: 'buddy brew',
      flavors: ['van', 'cho'],
    },
  ];

  findAll() {
    return this.coffees;
  }
  findOne(id: string) {
    return this.coffees.find((f) => f.id === +id);
  }
  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
    }
  }
  remove(id: number) {
    const findIndex = this.coffees.findIndex((f) => f.id === id);
    return this.coffees.splice(findIndex, 1);
  }
  create(data: Coffee) {
    return this.coffees.push(data);
  }
}
