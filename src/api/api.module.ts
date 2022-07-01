import { Module } from "@nestjs/common";

import { EmployersModule } from "src/api/employers/employers.module";
import { JobsModule } from "src/api/jobs/jobs.module";

@Module({
  imports: [EmployersModule, JobsModule],
})
export class ApiModule {}
