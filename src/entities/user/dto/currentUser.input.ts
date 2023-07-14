import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CurrentUserInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  email: string;
}
