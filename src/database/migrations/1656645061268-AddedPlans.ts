import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPlans1656645061268 implements MigrationInterface {
  name = "AddedPlans1656645061268";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subscription_plans\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(500) NOT NULL, \`price\` decimal(10,2) NOT NULL, UNIQUE INDEX \`IDX_ae18a0f6e0143f06474aa8cef1\` (\`name\`), UNIQUE INDEX \`IDX_87e59831c596ad7140cdee98a3\` (\`price\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_87e59831c596ad7140cdee98a3\` ON \`subscription_plans\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ae18a0f6e0143f06474aa8cef1\` ON \`subscription_plans\``
    );
    await queryRunner.query(`DROP TABLE \`subscription_plans\``);
  }
}
