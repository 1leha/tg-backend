import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { CategoryEntity } from 'src/entities/category/models/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsInt, IsDate } from 'class-validator';

@ObjectType()
@Entity('tasks')
export class TaskEntity {
  @IsInt()
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field()
  @Column()
  name: string;

  @IsDate()
  @Field({ nullable: true })
  @Column({ nullable: true })
  dataStart: Date;

  @IsDate()
  @Field({ nullable: true })
  @Column({ nullable: true })
  dataEnd: Date;

  @IsInt()
  @Field(() => Int)
  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.task, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => CategoryEntity)
  category: CategoryEntity;
}
