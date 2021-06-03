import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindManyOptions, FindOneOptions, getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ExceptionCodeName } from '../../enum/exception-codes.enum';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { ShopTypeService } from '../shop-type/shop-type.service';
import { UserService } from '../user/user.service';
import { CreateShopRatingDto } from './dto/create-shop-rating.dto';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopRating } from './shop-rating.entity';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    private shopTypeService: ShopTypeService,
    private userService: UserService,
  ) {}

  @Transactional()
  async create(
    requestUserPayload: RequestUserPayload,
    createShopDto: CreateShopDto,
    { filename }: Express.Multer.File,
  ): Promise<Shop> {
    const { name, description, shipping_location, type } = createShopDto;
    const shop = new Shop();
    const shopType = await this.shopTypeService.getOne({
      where: {
        key: type,
      },
    });
    if (!shopType) {
      throw new NotFoundException(ExceptionCodeName.INVALID_SHOP_TYPE);
    }
    const owner = await this.userService.getOne({
      where: {
        id: requestUserPayload.id,
      },
    });
    if (!owner) {
      throw new NotFoundException(ExceptionCodeName.USER_NOT_FOUND);
    }
    shop.name = name;
    shop.description = description;
    shop.image_path = '/uploads/' + filename;
    shop.shipping_location = shipping_location;
    shop.type = shopType;
    shop.owner = owner;
    shop.ratings = [];
    return getRepository(Shop).save(shop);
  }

  @Transactional()
  async createRating(
    id: number,
    requestUserPayload: RequestUserPayload,
    createShopRatingDto: CreateShopRatingDto,
  ): Promise<ShopRating> {
    const { rating, comment } = createShopRatingDto;
    const [shop, user] = await Promise.all([
      this.getOne({
        where: {
          id,
        },
      }),
      this.userService.getOne({
        where: {
          id: requestUserPayload.id,
        },
      }),
    ]);
    if (!shop) {
      throw new NotFoundException(ExceptionCodeName.SHOP_NOT_FOUND);
    }
    if (!user) {
      throw new NotFoundException(ExceptionCodeName.USER_NOT_FOUND);
    }
    const shopRating = new ShopRating();
    shopRating.rating = rating;
    shopRating.comment = comment;
    shopRating.shop = shop;
    shopRating.user = user;
    return await getRepository(ShopRating).save(shopRating);
  }

  @Transactional()
  async update(
    id: number,
    updateShopDto: UpdateShopDto,
    { filename }: Express.Multer.File,
    requestUserPayload: RequestUserPayload,
  ): Promise<Shop> {
    const { name, description, shipping_location, type } = updateShopDto;
    const shop = await this.getOne({
      where: {
        id,
      },
      relations: ['owner', 'ratings', 'type', 'ratings.user'],
    });
    if (!shop) {
      throw new NotFoundException(ExceptionCodeName.SHOP_NOT_FOUND);
    }
    if (shop.owner.id != requestUserPayload.id) {
      throw new UnauthorizedException(ExceptionCodeName.FORBIDDEN_RESOURCE);
    }
    const shopType = await this.shopTypeService.getOne({
      where: {
        key: type,
      },
    });
    if (!shopType) {
      throw new NotFoundException(ExceptionCodeName.INVALID_SHOP_TYPE);
    }
    shop.name = name;
    shop.description = description;
    shop.shipping_location = shipping_location;
    shop.type = shopType;
    shop.image_path = '/uploads/' + filename;
    return await getRepository(Shop).save(shop);
  }

  @Transactional()
  async getMany(options: FindManyOptions<Shop> = {}): Promise<Shop[]> {
    return getRepository(Shop).find(options);
  }

  @Transactional()
  async getOne(options: FindOneOptions<Shop> = {}): Promise<Shop | undefined> {
    return getRepository(Shop).findOne(options);
  }

  @Transactional()
  async delete(
    id: number,
    requestUserPayload: RequestUserPayload,
  ): Promise<void> {
    const shop = await this.getOne({
      where: {
        id,
      },
      relations: ['ratings', 'owner'],
    });
    if (!shop) {
      throw new NotFoundException(ExceptionCodeName.SHOP_NOT_FOUND);
    }
    if (shop.owner.id != requestUserPayload.id) {
      throw new UnauthorizedException(ExceptionCodeName.FORBIDDEN_RESOURCE);
    }
    await Promise.all(
      shop.ratings.map(
        async (rating) => await getRepository(ShopRating).remove(rating),
      ),
    );
    await getRepository(Shop).remove(shop);
  }
}
