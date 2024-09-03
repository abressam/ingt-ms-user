import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { PostUserReqDto } from '../dtos/requests/post-user-req.dto';

export interface UserServiceInterface {
  getUser(userUuid: string): Promise<GetUserResDto>;
  postUser(body: PostUserReqDto): Promise<GetUserResDto>
  putUser(uuid: string, body: PutUserReqDto): Promise<GetUserResDto>;
  deleteUser(uuid: string): Promise<DeleteUserResDto>;
}