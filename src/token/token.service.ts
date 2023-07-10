import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(data: string) {
    const payload = { data };
    return this.jwtservice.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: this.configService.get('jwtExpire'),
    });
  }

  async decodeJwtToken(token: string) {
    return this.jwtservice.decode(token);
  }
}
