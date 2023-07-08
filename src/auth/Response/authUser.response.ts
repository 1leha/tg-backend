import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class AuthUserResponse {
  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  token: string;
}
