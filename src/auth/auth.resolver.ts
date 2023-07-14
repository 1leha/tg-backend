import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { CreateUserInput } from 'src/entities/user/dto/createUser.input';
import { LoginUserInput } from './inputs/loginUser.input';
import { AuthUserResponse } from './Response/authUser.response';

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
  ): Promise<AuthUserResponse> {
    return await this.authService.loginUser(user);
  }
}
