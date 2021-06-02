import { Module } from '@nestjs/common';
import { ShopTypeController } from './shop-type.controller';
import { ShopTypeService } from './shop-type.service';

@Module({
  controllers: [ShopTypeController],
  providers: [ShopTypeService],
  exports: [ShopTypeService],
})
export class ShopTypeModule {}
