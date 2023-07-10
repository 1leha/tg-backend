import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
// import { IUser } from '../models/user.interface';
import { UserEntity } from '../models/user.entity';
import { UpdateUserInput } from '../inputs/updateUser.input';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Patch('update')
  updateUser(@Body() user: UpdateUserInput, @Req() req) {
    console.log(req);
    console.log(`User ${user.email} is updated`);
    return true;
  }
}
