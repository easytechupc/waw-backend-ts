import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1656641357391 implements MigrationInterface {
  name = "InitialCreate1656641357391";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`address\` varchar(200) NULL, \`email\` varchar(200) NOT NULL, UNIQUE INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`offers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(200) NOT NULL, \`image\` varchar(2000) NULL, \`description\` varchar(4000) NOT NULL, \`status\` tinyint NOT NULL, UNIQUE INDEX \`IDX_6a5e8040984e6f68b9377eadda\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_6a5e8040984e6f68b9377eadda\` ON \`offers\``
    );
    await queryRunner.query(`DROP TABLE \`offers\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` ON \`companies\``
    );
    await queryRunner.query(`DROP TABLE \`companies\``);
  }
}
