import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity('categories')
export class CategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn()
  dataCreated: Date;

  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.category)
  @Field(() => UserEntity)
  user: UserEntity;
}
