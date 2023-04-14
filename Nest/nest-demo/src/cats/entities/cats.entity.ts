import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  // @Column()
  // username: string;

  @Column()
  password: string;

  @Column()
  realname: string;

  @Column()
  state: string;
  // @Column()
  // created_time: string;
}
