import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { IUser } from '../models/user.interface';
import { UserEntity } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post()
  // createUser(@Body() user: IUser): Observable<IUser> {
  //   return this.userService.createUser(user);
  // }

  @Post()
  createUser(@Body() user: IUser): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
}
