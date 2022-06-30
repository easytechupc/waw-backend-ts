import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanProfile } from "./application/transform/profiles/plan.profile";
import { PlansRepositoryKey } from "./domain/repositories/plans.repository";
import { PlansService } from "./domain/services/plans/plans.service";
import { PlanEntity } from "./infrastructure/persistence/entities/plan.entity";
import { PlansRepository } from "./infrastructure/persistence/repositories/plans.repository";
import { PlansController } from "./interface/rest/plans.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [
    {
      provide: PlansRepositoryKey,
      useClass: PlansRepository,
    },
    PlansService,
    PlanProfile,
  ],
  controllers: [PlansController],
})
export class SubscriptionsModule {}
