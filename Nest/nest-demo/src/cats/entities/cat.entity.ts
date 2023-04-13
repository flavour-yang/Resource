import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  realname: string;

  @Column()
  state: string;
  @Column()
  created_time: string;
}
