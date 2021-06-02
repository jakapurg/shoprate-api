import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ShopType } from './shop-type.entity';

@Injectable()
export class ShopTypeService {
  @Transactional()
  async getMany(options: FindManyOptions<ShopType> = {}): Promise<ShopType[]> {
    return getRepository(ShopType).find(options);
  }

  @Transactional()
  async getOne(
    options: FindOneOptions<ShopType> = {},
  ): Promise<ShopType | undefined> {
    return getRepository(ShopType).findOne(options);
  }
}
