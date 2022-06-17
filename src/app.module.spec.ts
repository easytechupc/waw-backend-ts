import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { createORMConfig } from "test/utils/ormconfig";

jest.mock("./config/ormconfig", () => {
  return { ormConfigFactory: jest.fn(() => createORMConfig()) };
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
