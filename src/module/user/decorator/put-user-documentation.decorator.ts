import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Documentation,
  HttpMethodKey,
  GramNum,
} from '../../../decorator/documentation.decorator';
import { NotFoundResponse } from '../../../decorator/error-documentation.decorator.entity';
import { User } from '../user.entity';
class NotFoundUser extends NotFoundResponse {
  @ApiProperty({
    example: 'INVALID_USER_ID',
  })
  message: string;
}

export function PutUserDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.PUT, 'user', User, GramNum.SINGULAR),
    ApiNotFoundResponse({
      type: NotFoundUser,
      description: 'Invalid user id',
    }),
  );
}
