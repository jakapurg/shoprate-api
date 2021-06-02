import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetAllShopTypesDocumentation } from './decorator/get-all-shop-types-documentation.decorator';
import { ShopType } from './shop-type.entity';
import { ShopTypeService } from './shop-type.service';

@ApiTags('shop-type')
@Controller('shop-type')
export class ShopTypeController {
  constructor(private readonly shopTypeService: ShopTypeService) {}

  @GetAllShopTypesDocumentation()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ShopType[]> {
    return this.shopTypeService.getMany();
  }
}
