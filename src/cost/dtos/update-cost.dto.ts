import { ApiProperty } from '@nestjs/swagger';

export class UpdateCostDto {
  @ApiProperty({
    example: 'Наличные',
    description: 'Название статьи расхода',
  })
  readonly name?: string;

  @ApiProperty({
    example: 1000,
    description: 'Сумма расхода',
  })
  readonly sum?: number;

  @ApiProperty({
    description: 'Ссылка на иконку статьи расхода',
  })
  readonly icon?: string;

  @ApiProperty({
    example: 1000,
    description: 'Лимит расходов',
  })
  readonly limit?: number;
}
