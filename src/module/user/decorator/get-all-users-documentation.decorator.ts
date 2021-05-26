import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import {
  Documentation,
  HttpMethodKey,
  GramNum,
} from '../../../decorator/documentation.decorator';
import { User } from '../user.entity';

export function GetAllUsersDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.GET_ALL, 'user', User, GramNum.SINGULAR),
    ApiForbiddenResponse({
      description: 'Access is forbidden for this role',
    }),
  );
}
