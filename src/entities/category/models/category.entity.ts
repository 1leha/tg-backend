import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Field()
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: number;
}
