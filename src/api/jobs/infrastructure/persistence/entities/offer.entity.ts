import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("offers")
export class OfferEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column({ length: 200, nullable: false, unique: true })
  title!: string;

  @AutoMap()
  @Column({ length: 2000, nullable: true })
  image?: string;

  @AutoMap()
  @Column({ length: 4000, nullable: false })
  description!: string;

  @AutoMap()
  @Column({ nullable: false })
  status!: boolean;
}
