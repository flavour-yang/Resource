// 注册配置命名空间
import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  foo: 'bar',
}));
