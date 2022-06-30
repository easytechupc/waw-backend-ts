import { Company } from "./company.model";

describe("Company", () => {
  it("should be defined", () => {
    expect(new Company()).toBeDefined();
  });
});
