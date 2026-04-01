import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { Public } from 'src/common/decorrator/public.decorator';
import { User } from 'src/common/decorrator/user.decorator';

// class BodyDto {
//   email: string;
//   password: string;
// }

@Controller('/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  @Public()
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
  getInfo(@User() User) {
    console.log('getInfo', User);
    return 'user';
  }
}
