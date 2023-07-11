import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/entities/category/models/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  role: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token: string;

  @OneToMany(() => CategoryEntity, (category) => category.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => [CategoryEntity], { nullable: true })
  category: CategoryEntity[];
}
