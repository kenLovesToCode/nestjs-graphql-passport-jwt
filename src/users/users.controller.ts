import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersArgs } from './dto/args/get-users.args';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  getUserList(@Body() getUsersArgs: GetUsersArgs) {
    return this.usersService.getUsers(getUsersArgs);
  }
}
