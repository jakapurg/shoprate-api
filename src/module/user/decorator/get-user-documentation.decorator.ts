import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiProperty } from '@nestjs/swagger';
import {
  Documentation,
  GramNum,
  HttpMethodKey,
} from '../../../decorator/documentation.decorator';
import { NotFoundResponse } from '../../../decorator/error-documentation.decorator.entity';
import { User } from '../user.entity';
class NotFoundUser extends NotFoundResponse {
  @ApiProperty({
    example:
      'INVALID_USER_ID | INVALID_EMAIL | INVALID_VERIFICATION_TOKEN | INVALID_PASSWORD_RESET_TOKEN | INVALID_CHANGE_EMAIL_TOKEN | INVALID_FACEBOOK_ID | INVALID_STRAVA_ID',
  })
  message: string;
}
export function GetUserDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    Documentation(HttpMethodKey.GET, 'user', User, GramNum.SINGULAR),
    ApiNotFoundResponse({
      type: NotFoundUser,
      description: 'Invalid user id',
    }),
  );
}
