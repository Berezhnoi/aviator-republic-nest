import { ApiProperty } from '@nestjs/swagger';

export class FirebaseUser {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  accessToken: string;
}
