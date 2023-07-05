import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UserEntity } from '../models/user.entity';
// import { CreateUserInput } from '../inputs/createUser.input';
import { UpdateUserInput } from '../inputs/updateUser.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => UserEntity)
  // async createUser(
  //   @Args('createUser') user: CreateUserInput,
  // ): Promise<UserEntity> {
  //   console.log('RESOLVER createUser');
  //   return await this.userService.createUser(user);
  // }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Number)
  async deleteUserById(@Args('id') id: number): Promise<number> {
    return await this.userService.deleteUserById(id);
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    console.log('RESOLVER getAllUsers');

    return await this.userService.getAllUsers();
  }
}
