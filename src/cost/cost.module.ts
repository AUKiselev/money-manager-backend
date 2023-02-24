import { Cost, CostSchema } from './schemas/cost.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { CostController } from './cost.controller';
import { CostService } from './cost.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: CostSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CostController],
  providers: [CostService],
  exports: [CostService],
})
export class CostModule {}
