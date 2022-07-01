import { AutoMap } from "@automapper/classes";

export class CompanyResource {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  email!: string;
}
