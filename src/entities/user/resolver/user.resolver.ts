import {
  UseGuards,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import {
  Resolver,
  Mutation,
  Args,
  Query,
  GqlExecutionContext,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UserEntity } from '../models/user.entity';
import { UpdateUserInput } from '../inputs/updateUser.input';

import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CurrentUserResponse } from '../Response/currentUser.response';
import { CurrentUserInput } from '../inputs/currentUser.input';
import { CategoryEntity } from 'src/entities/category/models/category.entity';

const Request = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req,
);

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateCurrentUser(
    @Args('updateCurrentUser') updateUserInput: UpdateUserInput,
    @Request() req: ExecutionContext,
  ): Promise<CurrentUserResponse> {
    const currentUser = await this.userService.getCurrentUser(req);

    return await this.userService.updateCurrentUser(
      currentUser,
      updateUserInput,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async deleteUserById(@Args('id') id: number): Promise<number> {
    return await this.userService.deleteUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getCurrentUser(
    @Request() req: ExecutionContext,
  ): Promise<CurrentUserInput> {
    return await this.userService.getCurrentUser(req);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @ResolveField(() => CategoryEntity)
  category(@Parent() user: CurrentUserResponse): Promise<CategoryEntity[]> {
    return this.userService.getUserCategory(user.id);
  }
}
