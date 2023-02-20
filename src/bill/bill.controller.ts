import { UpdateBillDto } from './dtos/update-bill.dto';
import { CreateBillDto } from './dtos/create-bill.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bill } from './schemas/bill.schema';
import { ObjectId } from 'mongoose';

@ApiTags('Счета')
@Controller('/bills')
export class BillController {
  constructor(private billService: BillService) {}

  @ApiOperation({
    summary: 'Создать новый счет',
  })
  @ApiResponse({
    status: 200,
    type: Bill,
  })
  @Post()
  create(@Body() dto: CreateBillDto) {
    return this.billService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить массив счетов по ID пользователя',
  })
  @ApiResponse({
    status: 200,
    type: [Bill],
  })
  @Get(':user-id')
  getAll(@Param('user-id') userId: ObjectId) {
    return this.billService.getAll(userId);
  }

  @ApiOperation({
    summary: 'Изменить объект счета',
  })
  @ApiResponse({
    status: 200,
    type: Bill,
  })
  @Put(':id')
  updateOne(@Param('id') id: ObjectId, @Body() dto: UpdateBillDto) {
    return this.billService.updateOne(id, dto);
  }

  @ApiOperation({
    summary: 'Удалить счет',
  })
  @ApiResponse({
    status: 200,
    type: Bill,
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.billService.delete(id);
  }
}
