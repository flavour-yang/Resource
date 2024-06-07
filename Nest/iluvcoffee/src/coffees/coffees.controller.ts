import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('page')
  pagination(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `this action returns all coffees limit:${limit} offset:${offset}`;
  }

  @Get('/flavours')
  findAll() {
    return this.coffeesService.findAll();
    // return 'this action returns all coffees';
  }
  // @Get('/flavours')
  // findAll(@Res() response) {
  //   response.status(200).send('this action returns all coffees')
  // }
  @Get(':id')
  findOne(@Param() params) {
    return this.coffeesService.findOne(params.id);
    // return `this action returns #${params.id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch('/user/:id')
  update111(@Param('id') id: string, @Body() body) {
    return `this action returns #${id} coffee`;
  }

  @Post('/createPersion')
  createPersion(@Body() body) {
    return body;
  }
}
