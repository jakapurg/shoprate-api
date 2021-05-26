import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ConfigService } from '../src/module/config/config.service';
import { EncryptionService } from '../src/module/encryption/encryption.service';
import { UserRoleKey } from '../src/module/user/enum/user-role-key.enum';
import { UserService } from '../src/module/user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private userService: UserService,
  ) {}

  @Transactional()
  async seed(): Promise<void> {
    const [adminUser, userUser] = await Promise.all([
      this.userService.create({
        email: 'info@shoprate.com',
        password: 'ShopRate2021!',
        role: UserRoleKey.ADMIN,
      }),
      this.userService.create({
        email: 'user@shoprate.com',
        password: 'ShopRate2021!',
        role: UserRoleKey.USER,
      }),
    ]);
  }
}
