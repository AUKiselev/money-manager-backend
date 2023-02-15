import { Income } from './schemas/income.schema';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ObjectId } from 'mongoose';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeService } from './income.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Доходы')
@Controller('/incomes')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @ApiOperation({
    summary: 'Создать новый объект дохода пользователя',
  })
  @ApiResponse({
    status: 200,
    type: Income,
  })
  @Post()
  create(@Body() dto: CreateIncomeDto) {
    return this.incomeService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить все объекты дохода пользователя',
  })
  @ApiResponse({
    status: 200,
    type: [Income],
  })
  @Get()
  getAll() {
    return this.incomeService.getAll();
  }

  @ApiOperation({
    summary: 'Получить объект дохода по ID',
  })
  @ApiResponse({
    status: 200,
    type: Income,
  })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.incomeService.getOne(id);
  }

  @ApiOperation({
    summary: 'Изменить объект дохода',
  })
  @ApiResponse({
    status: 200,
    type: Income,
  })
  @Put(':id')
  updateOne(@Param('id') id: ObjectId, @Body() dto: UpdateIncomeDto) {
    return this.incomeService.updateOne(id, dto);
  }

  @ApiOperation({
    summary: 'Удалить объект дохода',
  })
  @ApiResponse({
    status: 200,
    type: Income,
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.incomeService.delete(id);
  }
}
