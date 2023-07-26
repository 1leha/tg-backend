import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsString()
  @Field()
  name: string;
}
