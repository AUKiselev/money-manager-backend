import { ApiProperty } from '@nestjs/swagger';

export class UpdateBillDto {
  @ApiProperty({
    example: 'Наличные',
    description: 'Название счета',
  })
  readonly name?: string;

  @ApiProperty({
    example: 1000,
    description: 'Сумма на счету',
  })
  readonly sum?: number;

  @ApiProperty({
    description: 'Объект настроек статьи дохода',
  })
  readonly settings?: {
    icon?: string;
    color?: string;
  };
}
