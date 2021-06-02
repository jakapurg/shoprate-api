import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { User } from '../user.entity';

export function GetMeDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.GET, 'user', User, GramNum.SINGULAR),
    ApiNotFoundResponse({
      type: 'User not found',
    }),
  );
}
