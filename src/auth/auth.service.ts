import { Injectable, BadRequestException } from '@nestjs/common';
import { appErrors } from 'src/common/constants/appErrors';
import { CreateUserInput } from 'src/entities/user/dto/createUser.input';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { UserService } from 'src/entities/user/user.service';
import { LoginUserInput } from './dto/loginUser.input';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';
import { AuthUserResponse } from './dto/authUser.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(user: CreateUserInput): Promise<AuthUserResponse> {
    const existUser = await this.userService.getUserByEmail(user.email);

    if (existUser) throw new BadRequestException(appErrors.USER_EXIST);

    const token = await this.tokenService.generateJwtToken(user.email);

    await this.userService.createUser({ ...user, token });

    const publicUser = await this.userService.getUsersPublicFieldsByEmail(
      user.email,
    );
    return { ...publicUser, token };
  }

  async loginUser(user: LoginUserInput): Promise<UserEntity> {
    const existUser = await this.userService.getUserByEmail(user.email);

    if (!existUser) throw new BadRequestException(appErrors.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      user.password,
      existUser.password,
    );

    if (!validatePassword) throw new BadRequestException(appErrors.BAD_REQUEST);

    const token = await this.tokenService.generateJwtToken(user.email);
    await this.userService.updateToken(user.email, token);

    const loginedUser = await this.userService.getUsersPublicFieldsByEmail(
      user.email,
    );

    return loginedUser;
  }

  async logoutUser(req: any): Promise<any> {
    const currentUser = await this.userService.getCurrentUser(req);
    const logoutedUser = await this.userService.resetTokenOfCurrentUser(
      currentUser,
    );
    return `User ${logoutedUser} is logout successfully...`;
  }
}
