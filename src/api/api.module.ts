import { Module } from "@nestjs/common";

import { EmployersModule } from "src/employers/employers.module";
import { JobsModule } from "src/jobs/jobs.module";

@Module({
  imports: [EmployersModule, JobsModule],
})
export class ApiModule {}
