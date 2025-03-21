import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Auth } from '../decorators/auth.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @Auth([], false)
  @ApiBearerAuth()
  @ApiResponse({
    description: 'Created user',
    type: User,
  })
  signup(@Req() req: any) {
    const fbUser = req.fbUser;

    return this.userService.createUser({
      name: fbUser.name,
      email: fbUser.email,
      uid: fbUser.uid,
    });
  }
}
