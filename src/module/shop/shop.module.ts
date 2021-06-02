import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '../config/config.service';
import { ShopTypeModule } from '../shop-type/shop-type.module';
import { UserModule } from '../user/user.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    ShopTypeModule,
    UserModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const tmpFolder = './public';
        return {
          dest: '../shoprate-web/public/uploads/',
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
