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
  @Column({ length: 200 })
  description!: string;

  @AutoMap()
  @Column({ type: "decimal", precision: 5 })
  price!: number;
}
