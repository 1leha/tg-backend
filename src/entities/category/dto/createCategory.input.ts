import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @ApiProperty()
  @IsString()
  @Field()
  name: string;

  @ApiProperty()
  @IsInt()
  @Field(() => Int)
  userId: number;
}
