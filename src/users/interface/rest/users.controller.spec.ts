import { UsersController } from "./users.controller";

describe("UsersController", () => {
  it("should be defined", () => {
    expect(new UsersController()).toBeDefined();
  });
});
