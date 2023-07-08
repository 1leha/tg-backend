import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginUserInput {
  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  password: string;
}
