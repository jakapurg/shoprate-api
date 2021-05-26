import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ExceptionCodeName } from '../../enum/exception-codes.enum';
import { EncryptionService } from '../encryption/encryption.service';
import { AccessToken } from '../encryption/interface/access-token.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
  ) {}

  @Transactional()
  async getAccessToken(user: User): Promise<AccessToken> {
    return await this.encryptionService.generateAccessToken(user.id, user.role);
  }

  @Transactional()
  async signUp(createUserDto: CreateUserDto): Promise<AccessToken> {
    const { password } = createUserDto;
    createUserDto.password =
      password && (await this.encryptionService.hashPassword(password));
    const user = await this.userService.create(createUserDto);
    return this.encryptionService.generateAccessToken(user.id, user.role);
  }

  @Transactional()
  async validateUserLocal(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<User> {
    const { email, password } = userCredentialsDto;
    const user = await this.userService.getOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(ExceptionCodeName.INVALID_CREDENTIALS);
    }
    const isValidPassword =
      user.password &&
      (await this.encryptionService.comparePassword(password, user.password));
    if (!isValidPassword) {
      throw new UnauthorizedException(ExceptionCodeName.INVALID_CREDENTIALS);
    }
    return user;
  }
}
