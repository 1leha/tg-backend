import { UseGuards } from '@nestjs/common';

import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UserEntity } from '../models/user.entity';
// import { CreateUserInput } from '../inputs/createUser.input';
import { UpdateUserInput } from '../inputs/updateUser.input';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
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

  // @UseGuards(JwtAuthGuard)
  // @Query(() => UserEntity)
  // async getCurrentUser(): Promise<UserEntity> {
  //   return await this.userService.getCurrentUser();
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    // console.log('RESOLVER getAllUsers');

    return await this.userService.getAllUsers();
  }
}
