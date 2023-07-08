import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserResponse {
  @Field()
  email: string;

  @Field()
  token: string;
}
