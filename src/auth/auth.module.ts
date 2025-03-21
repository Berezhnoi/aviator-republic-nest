import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.entity';
import { FirebaseSetup } from '../firebase/firebase.setup';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, FirebaseSetup],
})
export class AuthModule {}
