import { Field, InputType, ID } from '@nestjs/graphql';
import { EUserRoles } from 'src/common/constants/enums';
import { IsString, IsInt, IsEnum } from 'class-validator';

@InputType()
export class CurrentUserResponse {
  @IsInt()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  email: string;

  @IsEnum(EUserRoles)
  @Field()
  role: EUserRoles;
}
