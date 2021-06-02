import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ShopTypeKey } from '../../shop-type/enum/shop-type-key.enum';
import { ShopType } from '../../shop-type/shop-type.entity';
import { ShopShippingLocationKey } from '../enum/shop-shipping-location-key.enum';

export class CreateShopDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ShopShippingLocationKey)
  shipping_location: ShopShippingLocationKey;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ShopTypeKey)
  type: ShopTypeKey;
}
