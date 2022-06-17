import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class FakeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;
}

export type Entities = TypeOrmModuleOptions["entities"];

export const createORMConfig = (entities?: Entities) =>
  Promise.resolve<TypeOrmModuleOptions>({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    dropSchema: true,
    entities: Array.isArray(entities) ? entities : [FakeEntity],
    logging: false,
  });
