import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class TaskLengthResponse {
  //   @IsInt()
  @Field({ nullable: true })
  length: number;
}
