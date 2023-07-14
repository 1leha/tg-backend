import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { EUserRoles } from 'src/common/constants/enums';
import { IsString, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @IsString()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @Field()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EUserRoles)
  @Field({ nullable: true })
  role: EUserRoles;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  token: string;
}
