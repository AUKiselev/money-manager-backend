import { ApiProperty } from '@nestjs/swagger';

export class RegistrationUserDto {
  @ApiProperty({
    example: 'test@email.com',
    description: 'Почта пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 'superPass2000',
    description: 'Пароль',
  })
  readonly password: string;

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
}
