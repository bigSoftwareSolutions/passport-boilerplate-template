import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class UsersController {
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
