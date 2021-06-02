import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { EncryptionModule } from './module/encryption/encryption.module';
import { ConfigService } from './module/config/config.service';
import { SeedModule } from '../seed/seed.module';
import { ShopModule } from './module/shop/shop.module';
import { ShopTypeModule } from './module/shop-type/shop-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migration/*{.ts,.js}'],
        migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get('TYPEORM_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    SeedModule,
    EncryptionModule,
    ShopModule,
    ShopTypeModule,
  ],
  controllers: [],
})
export class AppModule {}
