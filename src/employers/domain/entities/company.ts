import { AutoMap } from "@automapper/classes";

export class Company {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  email: string;
}
