import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { CategoryEntity } from 'src/entities/category/models/category.entity';
import { UserEntity } from 'src/entities/user/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity('tasks')
export class TaskEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dataStart: Date;

  @Field()
  @Column()
  dataEnd: Date;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.task)
  @Field(() => CategoryEntity)
  category: CategoryEntity;
}
