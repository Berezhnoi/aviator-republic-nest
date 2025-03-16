import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  text: string;
}
