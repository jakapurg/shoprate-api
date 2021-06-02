import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindManyOptions, FindOneOptions, getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ExceptionCodeName } from '../../enum/exception-codes.enum';
import { EncryptionService } from '../encryption/encryption.service';
import { ShopRating } from '../shop/shop-rating.entity';
import { Shop } from '../shop/shop.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleKey } from './enum/user-role-key.enum';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private encryptionService: EncryptionService) {}

  @Transactional()
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.getOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) {
      if ((existingUser.email = createUserDto.email)) {
        throw new ConflictException(ExceptionCodeName.USER_EMAIL_CONFLICT);
      }
    }
    const user = await getRepository(User).save({
      email: createUserDto.email,
      password: await this.encryptionService.hashPassword(
        createUserDto.password,
      ),
      role: createUserDto.role ? createUserDto.role : UserRoleKey.USER,
    });
    return user;
  }

  @Transactional()
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.getOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(ExceptionCodeName.USER_NOT_FOUND);
    }
    user.email =
      updateUserDto.email !== undefined ? updateUserDto.email : user.email;
    user.first_name =
      updateUserDto.first_name !== undefined
        ? updateUserDto.first_name
        : user.first_name;
    user.last_name =
      updateUserDto.last_name !== undefined
        ? updateUserDto.last_name
        : user.last_name;
    user.role = updateUserDto.role ? updateUserDto.role : user.role;

    user = await getRepository(User).save(user);

    return user;
  }

  @Transactional()
  async getMany(options: FindManyOptions<User> = {}): Promise<User[]> {
    return getRepository(User).find(options);
  }

  @Transactional()
  async getOne(options: FindOneOptions<User> = {}): Promise<User | undefined> {
    return getRepository(User).findOne(options);
  }

  @Transactional()
  async delete(id: number): Promise<void> {
    const user = await this.getOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(ExceptionCodeName.USER_NOT_FOUND);
    }
    await getRepository(ShopRating)
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: user.id })
      .execute();
    await getRepository(Shop)
      .createQueryBuilder()
      .delete()
      .where('owner_id = :owner_id', { owner_id: user.id })
      .execute();
    await getRepository(User).remove(user);
  }
}
