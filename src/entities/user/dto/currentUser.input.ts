import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CurrentUserInput {
  @IsInt()
  @Field(() => ID)
  id: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email: string;
}
