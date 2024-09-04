import { SessionServiceInterface } from '@app/modules/session/services/session.service.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import {
  getJsonWebToken,
  encodePassword,
} from '@app/modules/session/utils/session.util';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { User } from '@app/modules/user/models/user.model';

@Injectable()
export class SessionService implements SessionServiceInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async postLogin(body: PostLoginReqDto): Promise<PostLoginResDto> {
    const secret = this.configService.get('auth.secret');
    const salt = this.configService.get('auth.salt');

    let user;

    if (body.crp) {
      user = await this.userModel.findOne({
        crp: body.crp,
        password: encodePassword(salt, body.password),
      }).exec();
    } else if (body.email) {
      user = await this.userModel.findOne({
        email: body.email,
        password: encodePassword(salt, body.password),
      }).exec();
  
      // Verifica se o usuário encontrado possui um crp associado
      if (user && user.crp) {
        // Bloqueia o login via email se o crp estiver presente
        throw new HttpException('Use CRP for login', HttpStatus.UNAUTHORIZED);
      }
    }

    // console.log('Password Hash:', encodePassword(salt, body.password));
    // console.log('CRP:', body.crp, 'Email:', body.email);

    this.validateCredentials(user);

    return { jwt: getJsonWebToken(user.uuid, user.crp, secret) };
  }

  private validateCredentials(user: UserDto | null) {
    if (!user) {
      throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }
}