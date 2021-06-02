import { applyDecorators } from '@nestjs/common';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { Shop } from '../shop.entity';

export function GetAllShopsDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.GET_ALL, 'shop', Shop, GramNum.SINGULAR),
  );
}
