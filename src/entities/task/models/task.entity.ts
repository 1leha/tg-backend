import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { CategoryEntity } from 'src/entities/category/models/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity('tasks')
export class TaskEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dataStart: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dataEnd: Date;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.task)
  @Field(() => CategoryEntity)
  category: CategoryEntity;
}
