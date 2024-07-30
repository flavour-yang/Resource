import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type']) // 添加索引另一种方式, 索引可以快速随机查找, 有效访问有序记录
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index() // 添加索引
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
