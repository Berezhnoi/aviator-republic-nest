import {
  Controller,
  Post,
  Body,
  HttpCode,
  Put,
  Param,
  Get,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, UserProfileDto } from './dto/user.dto';
import { StatusCodes } from 'http-status-codes';
import { Auth } from '../decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { FirebaseUser } from '../types/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @HttpCode(StatusCodes.OK)
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'Login via email/password (for backend testing purposes)',
    type: FirebaseUser,
  })
  login(@Body() loginRequest: LoginDto) {
    return this.userService.loginUser(loginRequest);
  }

  @Get('/profile/:id')
  @Auth([], true)
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  @ApiBearerAuth()
  @ApiResponse({ description: 'User profile', type: User })
  getProfile(@Param() params: { id: string }, @Req() req: any) {
    let { id } = params;

    if (id === 'me') {
      id = req.fbUser.uid;
    }

    return this.userService.getUser(id);
  }

  @Put('/profile/:id')
  @UseInterceptors(FileInterceptor('image'))
  @Auth([], true)
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  @ApiBearerAuth()
  @ApiResponse({ description: 'Updated user', type: User })
  updateUserProfile(
    @Req() req: any,
    @Body() userRequest: UserProfileDto,
    @Param() params: { id: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    image?: Express.Multer.File,
  ) {
    let { id } = params;

    if (id === 'me') {
      id = req.fbUser.uid;
    }

    return this.userService.updateUserProfile(id, userRequest, image);
  }
}
