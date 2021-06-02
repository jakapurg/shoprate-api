import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/roles.decorator';
import { GetUser } from '../../decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { UserRoleKey } from '../user/enum/user-role-key.enum';
import { DeleeteShopDocumentation } from './decorator/delete-shop-documentation.decorator';
import { GetAllShopsDocumentation } from './decorator/get-all-shops-documentation.decorator';
import { PostShopDocumentation } from './decorator/post-shop-documentation.decorator';
import { PostShopRateDocumentation } from './decorator/post-shop-rate-documentation.decorator';
import { UpdateShopDocumentation } from './decorator/update-shop-documentation.decorator';
import { CreateShopRatingDto } from './dto/create-shop-rating.dto';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopRating } from './shop-rating.entity';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @GetAllShopsDocumentation()
  @Get()
  async getAll(): Promise<Shop[]> {
    const shops = await this.shopService.getMany({
      relations: ['owner', 'type', 'ratings', 'ratings.user'],
    });
    shops.map((shop) => {
      shop.ratings.sort((a, b) => (a.created_at < b.created_at && 1) || -1);
    });
    return shops;
  }

  @PostShopDocumentation()
  @Roles(UserRoleKey.ADMIN, UserRoleKey.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @GetUser() requestUserPayload: RequestUserPayload,
    @Body() createShopDto: CreateShopDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Shop> {
    return this.shopService.create(requestUserPayload, createShopDto, image);
  }

  @PostShopRateDocumentation()
  @UseGuards(JwtAuthGuard)
  @Post(':id/rate')
  async createRate(
    @GetUser() requestUserPayload: RequestUserPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() createShopRatingDto: CreateShopRatingDto,
  ): Promise<ShopRating> {
    return this.shopService.createRating(
      id,
      requestUserPayload,
      createShopRatingDto,
    );
  }

  @UpdateShopDocumentation()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @GetUser() requestUserPayload: RequestUserPayload,
    @Body() updateShopDto: UpdateShopDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Shop> {
    return this.shopService.update(
      id,
      updateShopDto,
      image,
      requestUserPayload,
    );
  }

  @DeleeteShopDocumentation()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @GetUser() requestUserPayload: RequestUserPayload,
  ): Promise<void> {
    return this.shopService.delete(id, requestUserPayload);
  }
}
