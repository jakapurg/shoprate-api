import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
export enum HttpMethodKey {
  GET = 'GET',
  GET_ALL = 'GET_ALL',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}
export enum GramNum {
  PLURAL = 'PLURAL',
  SINGULAR = 'SINGULAR',
}

function getStringsFromGrammarNumber(grammarNumber: GramNum): string[] {
  let sAppendString = '';
  let verb = ' have been ';
  let negateVerb = 'do not';
  if (grammarNumber == GramNum.SINGULAR) {
    sAppendString = 's';
    verb = ' has been ';
    negateVerb = ' does not ';
  }
  return [sAppendString, verb, negateVerb];
}

export function Documentation<T>(
  method: HttpMethodKey,
  name: string,
  type: Type<T>,
  grammarNumber: GramNum,
): MethodDecorator & ClassDecorator {
  const [appendString, verb, negateVerb] =
    getStringsFromGrammarNumber(grammarNumber);
  const decoratorsArray = new Array<ClassDecorator>();
  decoratorsArray.push(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error occurred',
    }),
  );
  switch (method) {
    case HttpMethodKey.POST: {
      decoratorsArray.push(
        ApiCreatedResponse({
          description: 'The ' + name + verb + ' successfully created.',
          type: type,
        }),
        ApiBadRequestResponse({
          description: 'Invalid request body',
        }),
        ApiForbiddenResponse({
          description: 'Access is forbidden for this role',
        }),
      );
      break;
    }
    case HttpMethodKey.PUT: {
      decoratorsArray.push(
        ApiOkResponse({
          description:
            'The ' +
            name +
            ' with specific id' +
            verb +
            ' successfully updated.',
          type: type,
        }),
        ApiBadRequestResponse({
          description: 'Invalid request body',
        }),
        ApiNotFoundResponse({
          description: 'The ' + name + ' with this id' + negateVerb + 'exist.',
        }),
        ApiForbiddenResponse({
          description: 'Access is forbidden for this role',
        }),
      );
      break;
    }
    case HttpMethodKey.GET_ALL: {
      decoratorsArray.push(
        ApiOkResponse({
          description: 'The list of all ' + name + appendString,
          type: [type],
        }),
      );
      break;
    }
    case HttpMethodKey.GET: {
      decoratorsArray.push(
        ApiOkResponse({
          description: 'The ' + name + ' with specific id',
          type: type,
        }),
      );
      break;
    }
    case HttpMethodKey.DELETE: {
      decoratorsArray.push(
        ApiOkResponse({
          description: 'The ' + name + verb + 'successfully deleted.',
        }),
        ApiForbiddenResponse({
          description: 'Access is forbidden for this role',
        }),
      );
      break;
    }
  }
  return applyDecorators(...decoratorsArray);
}
