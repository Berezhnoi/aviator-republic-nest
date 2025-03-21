import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
  @ApiProperty()
  declare id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  uid: string;

  @ApiProperty()
  @Column
  firstName: string;

  @ApiProperty()
  @Column
  lastName: string;

  @ApiProperty()
  @Column
  username: string;

  @ApiProperty()
  @Column
  email: string;

  @ApiProperty()
  @Column
  phone: string;

  @ApiProperty()
  @Column
  country: string;

  @ApiProperty()
  @Column
  zipCode: string;

  @ApiProperty()
  @Column
  city: string;

  @ApiProperty()
  @Column
  avatar: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
  })
  bio: string;

  @ApiProperty()
  declare createdAt: Date;

  @ApiProperty()
  declare updatedAt: Date;
}
