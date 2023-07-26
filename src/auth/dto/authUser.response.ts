import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class AuthUserResponse {
  @IsInt()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  token: string;
}
