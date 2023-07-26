import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsDate()
  @Field()
  dataStart: Date;

  @IsDate()
  @Field()
  dataEnd: Date;

  @IsInt()
  @Field(() => Int)
  categoryId: number;
}
