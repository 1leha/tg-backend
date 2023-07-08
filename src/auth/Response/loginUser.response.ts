import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginUserResponse {
  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  token: string;
}
