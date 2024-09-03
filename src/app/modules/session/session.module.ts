import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/modules/user/models/user.model';
import { SessionService } from '@app/modules/session/services/session.service';
import { SessionController } from '@app/modules/session/controllers/session.controller';

@Module({ 
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [SessionService],
    controllers: [SessionController],
})
export class SessionModule {}