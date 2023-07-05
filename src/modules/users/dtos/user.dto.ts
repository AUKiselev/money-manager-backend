import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'test@email.com',
    description: 'Почта пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Случайная строка(генерируется автоматически)',
    description: 'ID пользователя',
  })
  readonly id: ObjectId;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  readonly firstName?: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  readonly lastName?: string;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    if (model.firstName) this.firstName = model.firstName;
    if (model.lastName) this.lastName = model.lastName;
  }
}
