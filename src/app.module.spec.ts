import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppModule } from "./app.module";

@Entity()
class FakeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;
}

jest.mock("./config/ormconfig", () => {
  return {
    ormConfigFactory: jest.fn(() =>
      Promise.resolve<TypeOrmModuleOptions>({
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        dropSchema: true,
        entities: [FakeEntity],
        logging: false,
      })
    ),
  };
});

describe("AppModule", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // Disable logging during tests
    app.useLogger(false);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it("should initialize correctly", () => {
    expect(app).toBeTruthy();
  });
});
