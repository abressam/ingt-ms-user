import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PostUserReqDto } from '../dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';

export interface UserControllerInterface {
  getUser(req: Request): Promise<GetUserResDto>;
  postUser(body: PostUserReqDto): Promise<GetUserResDto>
  putUser(body: PutUserReqDto, req: Request): Promise<GetUserResDto>;
  deleteUser(req: Request): Promise<DeleteUserResDto>;
}