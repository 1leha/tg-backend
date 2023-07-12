import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateTaskInput {
  @Field((type) => Int)
  id: number;

  @ApiProperty()
  @Field()
  name: string;

  @ApiProperty()
  @Field()
  dataStart: Date;

  @ApiProperty()
  @Field()
  dataEnd: Date;
}
