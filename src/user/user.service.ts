import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseSetup } from '../firebase/firebase.setup';
import { LoginDto, UserDto, UserProfileDto } from './dto/user.dto';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly firebase: FirebaseSetup,
  ) {}

  async getUser(uid: string) {
    return this.userModel.findOne({
      where: {
        uid,
      },
    });
  }

  async createUser(userRequest: UserDto): Promise<any> {
    const { name, email, uid } = userRequest;
    const [firstName, lastName] = name ? name.split(' ') : [null, null];

    const existingUser = await this.userModel.findOne({
      where: {
        uid,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.userModel.create({
      firstName,
      lastName,
      email,
      uid,
    });
  }

  async updateUserProfile(
    uid: string,
    userRequest: UserProfileDto,
    image?: Express.Multer.File,
  ) {
    const app = this.firebase.setupAdmin();

    const { firstName, lastName, email, phone, country, zipCode, city, bio } =
      userRequest;

    const user = await this.getUser(uid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (image) {
      const storage = app.storage();
      const bucket = storage.bucket();
      const { originalname, buffer, mimetype } = image;

      const fileName = `user-profiles/${uid}/${Date.now()}_${originalname}`;
      const file = bucket.file(fileName);

      await file.save(buffer, {
        metadata: {
          contentType: mimetype,
        },
      });

      if (user.dataValues.avatar) {
        const oldFile = user.dataValues.avatar.split('/').pop();
        await bucket.file(`user-profiles/${uid}/${oldFile}`).delete({
          ignoreNotFound: true,
        });
      }

      user.set(
        'avatar',
        `https://storage.googleapis.com/${bucket.name}/${fileName}`,
      );

      await user.save();
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      phone: phone || user.phone,
      country: country || user.country,
      zipCode: zipCode || user.zipCode,
      city: city || user.city,
      bio: bio || user.bio,
    });

    return user;
  }

  async loginUser(loginRequest: LoginDto) {
    const app = this.firebase.setup();

    const auth = getAuth(app);

    const { email, password } = loginRequest;

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredentials.user;

      const accessToken = await user?.getIdToken();

      return {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        emailVerified: user?.emailVerified,
        accessToken,
      };
    } catch (error) {
      console.log('Authenticating user failed:', error.message);
      throw new UnauthorizedException();
    }
  }
}
