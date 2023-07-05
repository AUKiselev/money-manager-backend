import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
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
}
