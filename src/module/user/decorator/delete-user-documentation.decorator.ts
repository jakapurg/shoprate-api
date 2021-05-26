import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function DeleteUserDocumentation(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiOkResponse({
      description: 'User has been successfully deleted',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error occurred',
    }),
  );
}
