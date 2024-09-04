import { UserServiceInterface } from '@app/modules/user/services/user.service.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PostUserReqDto } from '../dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { User } from '@app/modules/user/models/user.model';
import { encodePassword } from '@app/modules/session/utils/session.util';
import { v4 as uuidv4 } from 'uuid';
import { generatePacientId } from '@app/modules/user/utils/user.utils'; 

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async getUser(userUuid: string): Promise<GetUserResDto> {
    this.validateAuth(userUuid);

    const user = await this.userModel.findOne({ uuid: userUuid }).select('-password -cpfCnpj').exec(); 
    // execute query and return a promise

    // console.log('user:', user);

    this.validateUser(user);

    return { user };
  }

  async postUser(body: PostUserReqDto): Promise<GetUserResDto> {
    const salt = this.configService.get('auth.salt');
    let pacientId = null;

    await this.checkCpfCnpjExists(body.cpfCnpj);

    if (body.password) {
      body.password = encodePassword(salt, body.password);
    }

    if (!body.crp) {
      pacientId = generatePacientId(body.cpfCnpj);
    }

    const createdUser = new this.userModel({
      ...body,
      pacientId,
      uuid: uuidv4(), // generate a uuid
    });
    
    const savedUser = await createdUser.save();

    const { password, cpfCnpj, ...user } = savedUser.toObject();

    return {
      user: {
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,
        birthdate: user.birthdate,
        crp: user.crp,
        pacientId: user.pacientId
      },
    };
  }


  async putUser(userUuid: string, body: PutUserReqDto): Promise<GetUserResDto> {
    const salt = this.configService.get('auth.salt');

    this.validateAuth(userUuid);

    const userOld = await this.userModel.findOne({ uuid: userUuid }).select('-password -cpfCnpj').exec();

    this.validateUser(userOld);

    if (body.password) {
      body.password = encodePassword(salt, body.password);
    }

    const userNew = Object.assign({}, userOld.toObject(), body);

    await this.userModel.updateOne(
        { uuid: userUuid },
        {
          $set: {
              address: userNew.address,
              phone: userNew.phone,
              password: userNew.password,               
          }
        }
    );

    return {
      user: {
        name: userNew.name,
        address: userNew.address,
        phone: userNew.phone,
        email: userNew.email,
        birthdate: userNew.birthdate,
        crp: userNew.crp,
        pacientId: userNew.pacientId
      },
    };
  }

  async deleteUser(userUuid: string): Promise<DeleteUserResDto> {
    this.validateAuth(userUuid);

    const user = await this.userModel.findOne({ uuid: userUuid });

    this.validateUser(user);

    await user.deleteOne({ uuid: userUuid });

    return {
      statusCode: 200,
      message: 'User successfully deleted',
    };
  }

  private validateUser(user: UserDto) {
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
  }

  private validateAuth(userUuid: string) {
    if (!userUuid) {
      throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }

  private async checkCpfCnpjExists(cpfCnpj: string) {
    const existingUser = await this.userModel.findOne({ cpfCnpj }).exec();
    if (existingUser) {
      throw new HttpException('CPF/CNPJ alreay registered', HttpStatus.BAD_REQUEST);
    }
  }

}