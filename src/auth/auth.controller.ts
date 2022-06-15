import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(localAuthGuard)
  @Post('login')
  @Public()
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
}
