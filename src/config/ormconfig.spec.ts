import { MysqlConnectionCredentialsOptions } from "typeorm/driver/mysql/MysqlConnectionCredentialsOptions";
import { ormConfigFactory } from "./ormconfig";

describe("ORMConfig", () => {
  const originalEnvironment = process.env;
  const fakeCredentials = {
    DB_USER: "username",
    DB_PASSWORD: "password",
    DB_NAME: "database",
  };

  beforeEach(() => {
    // Clear jest cache
    jest.resetModules();
    // Create a copy of the environment
    process.env = {
      ...originalEnvironment,
      ...fakeCredentials,
    };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnvironment;
  });

  it("should include the correct credentials", async () => {
    const result = await ormConfigFactory();
    expect(result.type).toBe("mysql");
    const mysql = result as MysqlConnectionCredentialsOptions;
    expect(mysql.username).toBe(fakeCredentials.DB_USER);
    expect(mysql.password).toBe(fakeCredentials.DB_PASSWORD);
    expect(mysql.database).toBe(fakeCredentials.DB_NAME);
  });

  describe("production", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    });

    it("should return the correct logging settings", async () => {
      const result = await ormConfigFactory();
      expect(result.logging).toStrictEqual(["error", "warn"]);
    });

    it("shouldn't allow synchronization", async () => {
      const result = await ormConfigFactory();
      expect(result.synchronize).toBe(false);
    });
  });

  describe("development", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should return the correct logging settings", async () => {
      const result = await ormConfigFactory();
      expect(result.logging).toBe("all");
    });

    it("should allow synchronization", async () => {
      const result = await ormConfigFactory();
      expect(result.synchronize).toBe(true);
    });
  });

  describe("custom host and port", () => {
    beforeEach(() => {
      process.env.DB_HOST = "10.0.0.1";
      process.env.DB_PORT = "4000";
    });

    it("should return the correct host", async () => {
      const result = await ormConfigFactory();
      expect(result.type).toBe("mysql");
      const mysql = result as MysqlConnectionCredentialsOptions;
      expect(mysql.host).toBe("10.0.0.1");
    });

    it("should return the correct port", async () => {
      const result = await ormConfigFactory();
      expect(result.type).toBe("mysql");
      const mysql = result as MysqlConnectionCredentialsOptions;
      expect(mysql.port).toBe(4000);
    });
  });
});
