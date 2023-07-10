import { Field, InputType, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class AuthUserResponse {
  @ApiProperty()
  @Field(() => ID)
  id: number;

  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  token: string;
}
