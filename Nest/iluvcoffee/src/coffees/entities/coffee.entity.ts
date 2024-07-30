import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
@Entity() // 默认情况下创建class小写类名的表, 也可以指定 @Entity('name')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // 标记
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true }) // 多对多关系
  flavors: Flavor[];
}
