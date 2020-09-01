import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public email: string;

  @Column()
  public gender: string;

  @Column()
  public country: string;
  
  @Column()
  public dateOfBirth: number;

  @Column()
  public password: string;
}

export default User;
