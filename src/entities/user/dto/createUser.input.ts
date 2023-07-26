import { Field, InputType } from '@nestjs/graphql';
import { EUserRoles } from 'src/common/constants/enums';
import { IsString, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsOptional()
  @IsEnum(EUserRoles)
  @Field({ nullable: true })
  role: EUserRoles;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  token: string;
}
