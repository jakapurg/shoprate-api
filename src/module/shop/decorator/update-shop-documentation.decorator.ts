import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { Shop } from '../shop.entity';

export function UpdateShopDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.PUT, 'shop', Shop, GramNum.SINGULAR),
    ApiNotFoundResponse({
      description: 'Shop not found or invalid shop type',
    }),
    ApiConflictResponse({
      description: 'Only owner can update shop',
    }),
  );
}
