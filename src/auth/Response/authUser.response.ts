import { Field, InputType, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class AuthUserResponse {
  @ApiProperty()
  @IsInt()
  @Field(() => ID)
  id: number;

  @ApiProperty()
  @IsString()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @Field()
  token: string;
}
