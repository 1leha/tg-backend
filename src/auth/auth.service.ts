import { Injectable, BadRequestException } from '@nestjs/common';
import { appErrors } from 'src/common/constants/appErrors';
import { CreateUserInput } from 'src/entities/user/inputs/createUser.input';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { UserService } from 'src/entities/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: CreateUserInput): Promise<UserEntity> {
    const existUser = await this.userService.getUserByEmail(user.email);
    console.log('existUser :>> ', existUser);
    if (existUser) throw new BadRequestException(appErrors.USER_EXIST);

    return await this.userService.createUser(user);
  }
}
