import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: +configService.get<number>(
              'JWT_ACCESS_TOKEN_EXPIRATION',
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
