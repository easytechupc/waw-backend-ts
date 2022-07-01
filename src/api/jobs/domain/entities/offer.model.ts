import { AutoMap } from "@automapper/classes";

export class Offer {
  @AutoMap()
  id!: number;

  @AutoMap()
  title!: string;

  @AutoMap()
  image?: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  status!: boolean;
}
