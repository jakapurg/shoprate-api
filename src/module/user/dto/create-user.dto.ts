import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRoleKey } from '../enum/user-role-key.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRoleKey)
  role: UserRoleKey;
}
