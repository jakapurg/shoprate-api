import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { ShopRating } from '../shop-rating.entity';

export function PostShopRateDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(
      HttpMethodKey.POST,
      'shop rating',
      ShopRating,
      GramNum.SINGULAR,
    ),
    ApiNotFoundResponse({
      description: 'Shop not found or user not found',
    }),
  );
}
