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
  @IsDate()
  @Field({ nullable: true })
  dataStart: Date;

  @IsOptional()
  @ApiProperty()
  @IsDate()
  @Field({ nullable: true })
  dataEnd: Date;
}
