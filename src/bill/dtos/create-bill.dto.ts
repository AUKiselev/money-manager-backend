import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateBillDto {
  @ApiProperty({
    example: 'Наличные',
    description: 'Название счета',
  })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Количество денег на счету',
  })
  readonly sum?: number;

  @ApiProperty({
    example: 'iconoir:lot-of-cash',
    description: 'Название иконки счета',
  })
  readonly icon?: string;

  @ApiProperty({
    description: 'ID пользователя, добавляется автоматически',
  })
  readonly user: ObjectId;

  constructor(model) {
    this.name = model.name;
    this.user = model.user;
    this.sum = model.sum;
    this.icon = model.icon;
  }
}
