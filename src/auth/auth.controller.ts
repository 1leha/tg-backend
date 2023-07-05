import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/entities/user/inputs/createUser.input';
import { LoginUserInput } from './inputs/loginUser.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: CreateUserInput) {
    return await this.authService.registerUser(user);
  }

  @Post('login')
  async loginUser(@Body() user: LoginUserInput) {
    return this.authService.loginUser(user);
  }
}
