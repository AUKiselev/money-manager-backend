import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCostDto } from './dtos/create-cost.dto';
import { UpdateCostDto } from './dtos/update-cost.dto';
import { Cost, CostDocument } from './schemas/cost.schema';

@Injectable()
export class CostService {
  constructor(@InjectModel(Cost.name) private costModel: Model<CostDocument>) {}

  async create(dto: CreateCostDto): Promise<Cost> {
    const cost = await this.costModel.create({ ...dto, sum: 0 });

    return cost;
  }

  async getAllByUserId(userId: ObjectId): Promise<Cost[]> {
    const costs = await this.costModel.find({ user: userId });

    return costs;
  }

  async getOneById(costId: ObjectId): Promise<Cost> {
    const cost = await this.costModel.findById(costId);

    return cost;
  }

  async updateOne(id: ObjectId, dto: UpdateCostDto): Promise<Cost> {
    const cost = await this.costModel.findById(id);

    if (dto.name) {
      cost.name = dto.name;
    }
    if (!Number.isNaN(+dto.sum)) {
      cost.sum = dto.sum;
      cost.limit = dto.limit;
    }
    if (dto.settings && Object.keys(dto.settings).length) {
      const settingsKeys = Object.keys(dto.settings);

      settingsKeys.forEach((key) => {
        if (dto.settings[key]) cost.settings[key] = dto.settings[key];
      });
    }

    await cost.save();

    return cost;
  }

  async delete(id: ObjectId): Promise<Cost> {
    const cost = await this.costModel.findByIdAndDelete(id);
    return cost;
  }
}
