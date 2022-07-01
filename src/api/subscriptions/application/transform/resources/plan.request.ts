import { AutoMap } from "@automapper/classes";

export class PlanRequest {
  @AutoMap()
  name!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  price!: number;
}
