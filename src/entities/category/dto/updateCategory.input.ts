import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateCategoryInput {
  @Field((type) => Int)
  id: number;

  @ApiProperty()
  @Field()
  name: string;
}
