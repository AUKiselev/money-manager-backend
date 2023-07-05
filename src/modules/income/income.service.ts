import { CreateIncomeDto } from './dtos/create-income.dto';
import { Income, IncomeDocument } from './schemas/income.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateIncomeDto } from './dtos/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {}

  async create(dto: CreateIncomeDto): Promise<Income> {
    const income = await this.incomeModel.create({ ...dto, sum: 0 });

    return income;
  }

  async getAllByUserId(userId: ObjectId): Promise<Income[]> {
    const incomes = await this.incomeModel.find({ user: userId });

    return incomes;
  }

  async getOneById(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findById(id);
    return income;
  }

  async updateOne(id: ObjectId, dto: UpdateIncomeDto): Promise<Income> {
    const income = await this.incomeModel.findById(id);

    if (dto.name) {
      income.name = dto.name;
    }
    if (!Number.isNaN(+dto.sum)) {
      income.sum = dto.sum;
    }
    if (dto.settings && Object.keys(dto.settings).length) {
      const settingsKeys = Object.keys(dto.settings);

      settingsKeys.forEach((key) => {
        if (dto.settings[key]) income.settings[key] = dto.settings[key];
      });
    }

    await income.save();

    return income;
  }

  async delete(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findByIdAndDelete(id);
    return income;
  }
}
