import { AutoMap } from "@automapper/classes";

export class User {
  @AutoMap()
  id!: number;

  @AutoMap()
  fullName!: string;

  @AutoMap()
  preferredName?: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  birthdate!: Date;

  @AutoMap()
  location?: string;

  @AutoMap()
  biography?: string;

  @AutoMap()
  about?: string;
}
