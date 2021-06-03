import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ConfigService } from '../src/module/config/config.service';
import { EncryptionService } from '../src/module/encryption/encryption.service';
import { ShopTypeKey } from '../src/module/shop-type/enum/shop-type-key.enum';
import { ShopType } from '../src/module/shop-type/shop-type.entity';
import { ShopShippingLocationKey } from '../src/module/shop/enum/shop-shipping-location-key.enum';
import { Shop } from '../src/module/shop/shop.entity';
import { ShopService } from '../src/module/shop/shop.service';
import { UserRoleKey } from '../src/module/user/enum/user-role-key.enum';
import { UserService } from '../src/module/user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private userService: UserService,
    private shopService: ShopService,
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

    const [
      shopTypeFashion,
      shopTypeTech,
      shopTypeSports,
      shopTypeHealth,
      shopTypeOther,
    ] = await Promise.all(
      [
        {
          id: 1,
          key: ShopTypeKey.FASHION,
          name: 'Fashion',
          image_path: 'shop-type-fashion.jpg',
        },
        {
          id: 2,
          key: ShopTypeKey.TECH,
          image_path: 'shop-type-tech.jpg',
          name: 'Tech',
        },
        {
          id: 3,
          key: ShopTypeKey.SPORTS,
          name: 'Sports',
          image_path: 'shop-type-sports.jpg',
        },
        {
          id: 4,
          key: ShopTypeKey.HEALTH_BEAUTY,
          name: 'Health & Beauty',
          image_path: 'shop-type-health.jpg',
        },
        {
          id: 5,
          key: ShopTypeKey.OTHER,
          name: 'Other',
          image_path: 'shop-type-other.jpg',
        },
      ].map((st) => {
        const shopType = new ShopType();
        shopType.id = st.id;
        shopType.key = st.key;
        shopType.name = st.name;
        shopType.image_path = st.image_path;
        return getRepository(ShopType).save(shopType);
      }),
    );
    /*
      const shop = new Shop()
      shop.name='Shop one';
      shop.description = 'Shop description';
      shop.image_path="shop1.jpg";
      shop.shipping_location=ShopShippingLocationKey.WORLDWIDE;
      shop.type=shopTypeFashion;
      shop.owner = adminUser;
      await getRepository(Shop).save(shop)*/
  }
}
