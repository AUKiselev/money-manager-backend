import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CostService } from './cost.service';
import { CreateCostDto } from './dtos/create-cost.dto';
import { UpdateCostDto } from './dtos/update-cost.dto';
import { Cost } from './schemas/cost.schema';

@Controller('/costs')
export class CostController {
  constructor(private costService: CostService) {}

  @ApiOperation({
    summary: 'Создать новую статью расхода',
  })
  @ApiResponse({
    status: 200,
    type: Cost,
  })
  @Post()
  create(@Body() dto: CreateCostDto) {
    return this.costService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить массив расходов по ID пользователя',
  })
  @ApiResponse({
    status: 200,
    type: [Cost],
  })
  @Get(':user-id')
  getAll(@Param('user-id') userId: ObjectId) {
    return this.costService.getAll(userId);
  }

  @ApiOperation({
    summary: 'Изменить объект статьи расхода',
  })
  @ApiResponse({
    status: 200,
    type: Cost,
  })
  @Put(':id')
  updateOne(@Param('id') id: ObjectId, @Body() dto: UpdateCostDto) {
    return this.costService.updateOne(id, dto);
  }

  @ApiOperation({
    summary: 'Удалить статью расхода',
  })
  @ApiResponse({
    status: 200,
    type: Cost,
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.costService.delete(id);
  }
}
