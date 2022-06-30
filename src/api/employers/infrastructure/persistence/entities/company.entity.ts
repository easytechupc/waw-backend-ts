import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("companies")
export class CompanyEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column({ length: 200, unique: true })
  name!: string;

  @AutoMap()
  @Column({ length: 200, nullable: true })
  address?: string;

  @AutoMap()
  @Column({ length: 200 })
  email!: string;
}
