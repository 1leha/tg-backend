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

  @ManyToOne(() => UserEntity, (user) => user.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => [TaskEntity], { nullable: true })
  task: TaskEntity[];
}
