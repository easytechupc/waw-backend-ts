import { Company } from "../../../employers/domain/entities/company";

describe("Company", () => {
  it("should be defined", () => {
    expect(new Company()).toBeDefined();
  });
});
