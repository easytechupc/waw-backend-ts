import { AutoMap } from "@automapper/classes";

export class OfferRequest {
  @AutoMap()
  title!: string;

  @AutoMap()
  image?: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  status!: boolean;
}
