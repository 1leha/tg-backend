import { Field, InputType, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CurrentUserResponse {
  @ApiProperty()
  @Field(() => ID)
  id: number;

  @ApiProperty()
  @Field()
  email: string;

  @ApiProperty()
  @Field()
  role: string;
}
