import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsDate()
  @Field()
  dataStart: Date;

  @IsDate()
  @Field()
  dataEnd: Date;
}
