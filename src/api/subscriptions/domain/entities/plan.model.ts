import { AutoMap } from "@automapper/classes";

export class Plan {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  price!: number;
}
