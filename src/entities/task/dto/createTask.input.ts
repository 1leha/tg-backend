import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsString()
  @ApiProperty()
  @Field()
  name: string;

  @IsString()
  @ApiProperty()
  @Field()
  description: string;

  @IsDate()
  @ApiProperty()
  @Field()
  dataStart: Date;

  @IsDate()
  @ApiProperty()
  @Field()
  dataEnd: Date;

  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  categoryId: number;
}
