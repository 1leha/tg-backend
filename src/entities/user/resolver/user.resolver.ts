import {
  UseGuards,
  createParamDecorator,
  ExecutionContext,
  Req,
} from '@nestjs/common';

import {
  Resolver,
  Mutation,
  Args,
  Query,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UserEntity } from '../models/user.entity';
import { UpdateUserInput } from '../inputs/updateUser.input';

import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthUserResponse } from 'src/auth/Response/authUser.response';

const Request = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req,
);

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateCurrentUser(
    @Args('updateCurrentUser') updateUserInput: UpdateUserInput,
    @Request() req: ExecutionContext,
  ): Promise<UserEntity> {
    const currentUser = await this.userService.getCurrentUser(req);

    return await this.userService.updateCurrentUser(
      currentUser,
      updateUserInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async deleteUserById(@Args('id') id: number): Promise<number> {
    return await this.userService.deleteUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getCurrentUser(
    @Request() req: ExecutionContext,
  ): Promise<AuthUserResponse> {
    return await this.userService.getCurrentUser(req);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    // console.log('RESOLVER getAllUsers');

    return await this.userService.getAllUsers();
  }
}
