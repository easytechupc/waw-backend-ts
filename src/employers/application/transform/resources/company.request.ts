import { AutoMap } from "@automapper/classes";

export class CompanyRequest {
  @AutoMap()
  name!: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  email!: string;
}
