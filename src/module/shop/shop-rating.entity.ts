import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Shop } from './shop.entity';

@Entity()
export class ShopRating {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 3 })
  @Column()
  rating: number;

  @ApiPropertyOptional({ example: 'comment' })
  @Column({ nullable: true })
  comment?: string;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Type(() => User)
  user: User;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  @Type(() => Shop)
  shop: Shop;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
