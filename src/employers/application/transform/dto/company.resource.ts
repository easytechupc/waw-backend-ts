import { AutoMap } from "@automapper/classes";

export class OfferResource {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  email!: string;
}
