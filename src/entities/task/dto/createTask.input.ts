import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateTaskInput {
  @ApiProperty()
  @Field()
  name: string;

  @ApiProperty()
  @Field()
  dataStart: Date;

  @ApiProperty()
  @Field()
  dataEnd: Date;

  @ApiProperty()
  @Field(() => Int)
  categoryId: number;
}
