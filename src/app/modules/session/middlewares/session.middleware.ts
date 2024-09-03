import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
    Logger,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { checkJsonWebToken } from '@app/modules/session/utils/session.util';
  
  @Injectable()
  export class SessionMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}
  
    async use(
      req: Request,
      _res: Response,
      next: (error?: any) => void,
    ): Promise<void> {
      const logger = new Logger(SessionMiddleware.name);
  
      try {
        const token = req.headers['authorization']?.split(' ').pop();
        const secret = this.configService.get('auth.secret');
        const jwtPayload = checkJsonWebToken(token, secret);
  
        req['userUuid'] = jwtPayload['userUuid'];
        req['crp'] = jwtPayload['crp'];
  
        next();
      } catch (error) {
        logger.error(error);
        throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
      }
    }
  }