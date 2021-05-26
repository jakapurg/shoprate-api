import { ApiProperty } from '@nestjs/swagger';

class ErrorResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}

export class NotFoundResponse extends ErrorResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;
}
export class UnprocessableResponse extends ErrorResponse {
  @ApiProperty({ example: 422 })
  statusCode: number;
}
export class UnauthorizedResponse extends ErrorResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;
}
export class InternalServerErrorResponse extends ErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;
}
export class ConflictResponse extends ErrorResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;
}
export class ForbiddenResponse extends ErrorResponse {
  @ApiProperty({ example: 403 })
  statusCode: number;
}
