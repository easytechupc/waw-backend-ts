import { AutoMap } from "@automapper/classes";

export class PlanResource {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  price!: number;
}
