import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column({ length: 256, nullable: false })
  fullName!: string;

  @AutoMap()
  @Column({ length: 256, nullable: true })
  preferredName?: string;

  @AutoMap()
  @Column({ length: 256, nullable: false })
  email!: string;

  @AutoMap()
  @Column({ nullable: false })
  birthdate!: Date;

  @AutoMap()
  @Column({ length: 256, nullable: true })
  location?: string;

  @AutoMap()
  @Column({ length: 256, nullable: true })
  biography?: string;

  @AutoMap()
  @Column({ length: 256, nullable: true })
  about?: string;
}
