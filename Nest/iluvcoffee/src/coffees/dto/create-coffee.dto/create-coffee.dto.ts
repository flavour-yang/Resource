import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  @IsString()  // 必填
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true }) // 必填 (each代表 string 数组)
  readonly flavors: string[];
}
