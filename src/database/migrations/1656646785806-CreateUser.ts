import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1656646785806 implements MigrationInterface {
    name = 'CreateUser1656646785806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(256) NOT NULL, \`preferredName\` varchar(256) NULL, \`email\` varchar(256) NOT NULL, \`birthdate\` datetime NOT NULL, \`location\` varchar(256) NULL, \`biography\` varchar(256) NULL, \`about\` varchar(256) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
