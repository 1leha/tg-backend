import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  password: string;

  @ApiProperty()
  @Field()
  role: string;

  @ApiProperty()
  @Field({ nullable: true })
  token: string;
}
