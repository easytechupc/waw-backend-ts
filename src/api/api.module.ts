import { Module } from "@nestjs/common";

import { EmployersModule } from "src/api/employers/employers.module";
import { JobsModule } from "src/api/jobs/jobs.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [EmployersModule, JobsModule, UsersModule],
})
export class ApiModule {}
