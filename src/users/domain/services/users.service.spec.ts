import { UsersService } from "./users.service";

describe("UsersService", () => {
  it("should be defined", () => {
    expect(new UsersService()).toBeDefined();
  });
});
