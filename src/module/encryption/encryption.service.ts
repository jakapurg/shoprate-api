import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoleKey } from '../user/enum/user-role-key.enum';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { AccessToken } from './interface/access-token.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EncryptionService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds: number = +this.configService.get<number>(
      'JWT_BCRYPT_SALT_ROUNDS',
    );

    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateAccessToken(
    id: number,
    user_role: UserRoleKey,
  ): Promise<AccessToken> {
    const payload: RequestUserPayload = { id, user_role };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
