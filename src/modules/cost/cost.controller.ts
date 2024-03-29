import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CostService } from './cost.service';
import { CreateCostDto } from './dtos/create-cost.dto';
import { UpdateCostDto } from './dtos/update-cost.dto';
import { Cost } from './schemas/cost.schema';

@ApiTags('Расходы')
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
  @Get(':userId')
  getAll(@Param('userId') userId: ObjectId) {
    return this.costService.getAllByUserId(userId);
  }

  @ApiOperation({
    summary: 'Получить объект расхода по ID',
  })
  @ApiResponse({
    status: 200,
    type: Cost,
  })
  @Get('/cost/:id')
  getOneById(@Param('id') id: ObjectId) {
    return this.costService.getOneById(id);
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
