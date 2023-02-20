import { UsersModule } from './../users/users.module';
import { Bill, BillSchema } from './schemas/bill.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
