import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskLengthResponse {
  @Field({ nullable: true })
  length: number;
}
