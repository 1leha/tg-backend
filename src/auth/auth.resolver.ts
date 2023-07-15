import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { CreateUserInput } from 'src/entities/user/dto/createUser.input';
import { LoginUserInput } from './dto/loginUser.input';
import { AuthUserResponse } from './dto/authUser.response';
import { Request } from 'src/common/decorators/userContextFromRequest';
import { ExecutionContext, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  async registerUser(
    @Args('registerUser') user: CreateUserInput,
  ): Promise<AuthUserResponse> {
    return await this.authService.registerUser(user);
  }

  @Mutation(() => UserEntity)
  async loginUser(
    @Args('loginUser') user: LoginUserInput,
  ): Promise<UserEntity> {
    return await this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async logoutUser(@Request() req: ExecutionContext): Promise<any> {
    return this.authService.logoutUser(req);
  }
}
