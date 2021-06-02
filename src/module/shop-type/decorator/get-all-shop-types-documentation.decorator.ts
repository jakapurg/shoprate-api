import { applyDecorators } from '@nestjs/common';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { ShopType } from '../shop-type.entity';

export function GetAllShopTypesDocumentation(): MethodDecorator &
  ClassDecorator {
  return applyDecorators(
    Documentation(
      HttpMethodKey.GET_ALL,
      'shop type',
      ShopType,
      GramNum.SINGULAR,
    ),
  );
}
