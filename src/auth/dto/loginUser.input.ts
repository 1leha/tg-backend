import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @ApiProperty()
  @IsString()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @Field()
  password: string;
}
