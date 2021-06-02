import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { Shop } from '../shop.entity';

export function DeleeteShopDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.DELETE, 'shop', Shop, GramNum.SINGULAR),
    ApiNotFoundResponse({
      description: 'Shop not found',
    }),
    ApiConflictResponse({
      description: 'Only owner can delete shop',
    }),
  );
}
