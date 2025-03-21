import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseSetup } from '../firebase/firebase.setup';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, FirebaseSetup],
})
export class UserModule {}
