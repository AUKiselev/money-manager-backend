import { ApiProperty } from '@nestjs/swagger';

export class UpdateIncomeDto {
  @ApiProperty({
    example: 'Зарплата',
    description: 'Название статьи дохода',
  })
  readonly name?: string;

  @ApiProperty({
    example: 1000,
    description: 'Сумма дохода',
  })
  readonly sum?: number;

  @ApiProperty({
    description: 'Ссылка на иконку статьи дохода',
  })
  readonly icon?: string;
}
