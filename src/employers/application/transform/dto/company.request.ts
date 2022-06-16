import { AutoMap } from "@automapper/classes";

export class OfferRequest {
  @AutoMap()
  name!: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  email!: string;
}
