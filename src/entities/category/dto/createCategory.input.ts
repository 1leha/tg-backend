import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateCategoryInput {
  @ApiProperty()
  @Field()
  name: string;

  @Field((type) => Int)
  userId: number;
}
