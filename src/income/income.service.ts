import { CreateIncomeDto } from './dto/create-income.dto';
import { Income, IncomeDocument } from './schemas/income.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {}

  async create(dto: CreateIncomeDto): Promise<Income> {
    const income = await this.incomeModel.create({ ...dto, sum: 0, icon: '' });
    return income;
  }

  async getAll(): Promise<Income[]> {
    const incomes = await this.incomeModel.find();
    return incomes;
  }

  async getOne(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findById(id);
    return income;
  }

  async updateOne(id: ObjectId, dto: UpdateIncomeDto): Promise<Income> {
    const income = await this.incomeModel.findById(id);

    if (dto.name) {
      income.name = dto.name;
    }
    if (dto.sum) {
      income.sum = dto.sum;
    }
    if (dto.icon) {
      income.icon = dto.icon;
    }

    await income.save();

    return income;
  }

  async delete(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findByIdAndDelete(id);
    return income;
  }
}
