import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleKey } from '../enum/user-role-key.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  first_name?: string | null;

  @IsOptional()
  @IsString()
  last_name?: string | null;

  @IsOptional()
  @IsEnum(UserRoleKey)
  role?: UserRoleKey | null;
}
