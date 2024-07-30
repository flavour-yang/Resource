import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() //缺失或者不定义不会抛出异常
  @IsPositive() // 值为正数, 则大于零
  // @Type(() => Number) // 装饰符 确保传入的值为数值, 配置enableImplicitConversion可以不用写
  limit: number;

  // @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
