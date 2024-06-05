import { PartialType } from '@nestjs/mapped-types';
import { CreateTestaDto } from './create-testa.dto';

export class UpdateTestaDto extends PartialType(CreateTestaDto) {}
