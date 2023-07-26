import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @ApiProperty()
  @IsDate()
  @Field()
  dataStart: Date;

  @ApiProperty()
  @IsDate()
  @Field()
  dataEnd: Date;
}
