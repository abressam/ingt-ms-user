import { SessionService } from '@app/modules/session/services/session.service';
import { SessionControllerInterface } from '@app/modules/session/controllers/session.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('session')
@Controller('session')
export class SessionController implements SessionControllerInterface {
  constructor(private readonly sessionService: SessionService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Post the login credentials data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the jwt data',
    type: PostLoginResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async postLogin(@Body() body: PostLoginReqDto) {
    const logger = new Logger(SessionController.name);

    try {
      logger.log('postLogin()');
      return await this.sessionService.postLogin(body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}