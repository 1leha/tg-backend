import { Field, InputType, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { EUserRoles } from 'src/common/constants/enums';
import { IsString, IsInt, IsEnum } from 'class-validator';

@InputType()
export class CurrentUserResponse {
  @ApiProperty()
  @IsInt()
  @Field(() => ID)
  id: number;

  @ApiProperty()
  @IsString()
  @Field()
  email: string;

  @ApiProperty()
  @IsEnum(EUserRoles)
  @Field()
  role: EUserRoles;
}
