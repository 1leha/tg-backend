import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateCategoryResponse {
  @IsInt()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @IsString()
  @Field()
  name: string;

  @ApiProperty()
  @IsString()
  @Field()
  description: string;
}
