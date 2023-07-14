import { Field, InputType } from '@nestjs/graphql';
import { EUserRoles } from 'src/common/constants/enums';
import { IsString, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  password: string;

  @IsOptional()
  @IsEnum(EUserRoles)
  @Field({ nullable: true })
  role: EUserRoles;
}
