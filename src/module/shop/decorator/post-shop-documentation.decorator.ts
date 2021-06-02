import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { Shop } from '../shop.entity';

export function PostShopDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.POST, 'shop', Shop, GramNum.SINGULAR),
    ApiNotFoundResponse({
      description: 'Invalid shop type or user not found',
    }),
  );
}
