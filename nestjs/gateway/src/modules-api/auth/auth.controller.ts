import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

// class BodyDto {
//   email: string;
//   password: string;
// }

@Controller('/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    body: LoginDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const result = await this.AuthService.login(body);
    res.cookie('accessToken', result.accessToken);
    res.cookie('refreshToken', result.refreshToken);
    res.json;
    return true;
  }

  @Get('get-info')
  getinfo() {
    return 'user';
  }
}
