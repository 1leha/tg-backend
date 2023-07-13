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
  @Field({ nullable: true })
  dataStart: Date;

  @ApiProperty()
  @Field({ nullable: true })
  dataEnd: Date;
}
