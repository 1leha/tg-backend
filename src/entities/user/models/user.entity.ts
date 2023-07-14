import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';
import { EUserRoles } from 'src/common/constants/enums';
import { CategoryEntity } from 'src/entities/category/models/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @IsInt()
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field()
  @Column()
  email: string;

  @IsString()
  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: 'enum', enum: EUserRoles, default: EUserRoles.user })
  role: EUserRoles;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;

  @OneToMany(() => CategoryEntity, (category) => category.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @IsArray()
  @Field(() => [CategoryEntity], { nullable: true })
  category: CategoryEntity[];
}
