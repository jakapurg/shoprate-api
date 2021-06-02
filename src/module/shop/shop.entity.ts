import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopType } from '../shop-type/shop-type.entity';
import { User } from '../user/user.entity';
import { ShopShippingLocationKey } from './enum/shop-shipping-location-key.enum';
import { ShopRating } from './shop-rating.entity';

@Entity()
export class Shop {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'Description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'shop-logo.jpg' })
  @Column({ type: 'text' })
  image_path: string;

  @ApiProperty({ example: ShopShippingLocationKey.WORLDWIDE })
  @Column()
  shipping_location: ShopShippingLocationKey;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  @Type(() => User)
  owner: User;

  @ApiProperty({ type: ShopType })
  @ManyToOne(() => ShopType)
  @JoinColumn({ name: 'type_id' })
  @Type(() => ShopType)
  type: ShopType;

  @OneToMany(() => ShopRating, (rating) => rating.shop)
  @Type(() => ShopRating)
  ratings: ShopRating[];

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
