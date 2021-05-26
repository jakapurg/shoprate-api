import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleKey } from './enum/user-role-key.enum';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: UserRoleKey.ADMIN })
  @Column({ type: 'enum', enum: UserRoleKey })
  role: UserRoleKey;

  @ApiProperty({ example: 'relax@mail.com' })
  @Column({
    unique: true,
    type: 'text',
  })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({ example: 'Janez' })
  @Column({ nullable: true, type: 'text' })
  first_name?: string | null;

  @ApiProperty({ example: 'Novak' })
  @Column({ nullable: true, type: 'text' })
  last_name?: string | null;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
