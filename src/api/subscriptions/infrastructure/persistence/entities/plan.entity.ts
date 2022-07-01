import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subscription_plans")
export class PlanEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column({ length: 30, unique: true })
  name!: string;

  @AutoMap()
  @Column({ length: 500 })
  description!: string;

  @AutoMap()
  @Column({ type: "decimal", precision: 10, scale: 2, unique: true })
  price!: number;
}
