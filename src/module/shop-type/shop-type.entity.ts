import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopTypeKey } from './enum/shop-type-key.enum';

@Entity()
export class ShopType {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'type name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: ShopTypeKey })
  @Column({
    unique: true,
  })
  key: ShopTypeKey;

  @ApiProperty({ example: 'image.jpg' })
  @Column({ type: 'text' })
  image_path: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
