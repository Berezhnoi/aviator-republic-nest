import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseSetup } from '../firebase/firebase.setup';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private reflector: Reflector,
    private readonly firebase: FirebaseSetup,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.firebase.setupAdmin();
    const request = context.switchToHttp().getRequest();

    const checkUser = this.reflector.get('useDBUser', context.getHandler());
    const roles: string[] = this.reflector.get('roles', context.getHandler());

    if (!context.getArgs()[0]?.headers?.authorization) {
      throw new UnauthorizedException('Access token is missing');
    }

    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      app.storage().bucket();
      const user = await app.auth().verifyIdToken(idToken);

      if (user) {
        request.fbUser = user;

        if (checkUser) {
          const dbUser = await this.userModel.findOne({
            where: {
              uid: user.uid,
            },
          });

          if (!dbUser) {
            throw new UnauthorizedException();
          }
        }

        return true;
      }

      throw new UnauthorizedException();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
