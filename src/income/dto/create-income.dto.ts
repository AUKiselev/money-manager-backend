import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty({
    example: 'Зарплата',
    description: 'Название статьи дохода',
  })
  readonly name: string;
}
