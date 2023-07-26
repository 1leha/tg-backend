import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field(() => Int)
  userId: number;
}
