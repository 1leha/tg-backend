import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/entities/user/inputs/createUser.input';
import { LoginUserInput } from './inputs/loginUser.input';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './Response/authUser.response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('register')
  async registerUser(@Body() user: CreateUserInput): Promise<AuthUserResponse> {
    return await this.authService.registerUser(user);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  async loginUser(@Body() user: LoginUserInput): Promise<AuthUserResponse> {
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    console.log('TEST');
  }
}
