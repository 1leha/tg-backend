import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { TaskEntity } from 'src/entities/task/models/task.entity';
import { UserEntity } from 'src/entities/user/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsString, IsInt, IsDate, IsArray } from 'class-validator';
import { TaskLengthResponse } from 'src/entities/task/dto/taskLength.response';

@ObjectType()
@Entity('categories')
export class CategoryEntity {
  @IsInt()
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field()
  @Column()
  name: string;

  @IsDate()
  @Field()
  @CreateDateColumn()
  dataCreated: Date;

  @IsInt()
  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => UserEntity)
  user: UserEntity;

  @IsArray()
  @OneToMany(() => TaskEntity, (task) => task.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => [TaskEntity], { nullable: true })
  task: TaskEntity[];
}
