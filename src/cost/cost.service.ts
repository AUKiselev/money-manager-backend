import { UsersService } from './../users/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCostDto } from './dtos/create-cost.dto';
import { UpdateCostDto } from './dtos/update-cost.dto';
import { Cost, CostDocument } from './schemas/cost.schema';

@Injectable()
export class CostService {
  constructor(
    @InjectModel(Cost.name) private costModel: Model<CostDocument>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(dto: CreateCostDto): Promise<Cost> {
    const cost = await this.costModel.create({ ...dto, sum: 0, icon: '' });
    return cost;
  }

  async getAllById(userId: ObjectId): Promise<Cost[]> {
    const costs = await this.costModel.find({ user: userId });

    return costs;
  }

  async updateOne(id: ObjectId, dto: UpdateCostDto): Promise<Cost> {
    const cost = await this.costModel.findById(id);

    if (dto.name) {
      cost.name = dto.name;
    }
    if (dto.sum) {
      cost.sum = dto.sum;
    }
    if (dto.icon) {
      cost.icon = dto.icon;
    }
    if (dto.limit) {
      cost.limit = dto.limit;
    }

    await cost.save();

    return cost;
  }

  async delete(id: ObjectId): Promise<Cost> {
    const cost = await this.costModel.findByIdAndDelete(id);
    return cost;
  }
}
