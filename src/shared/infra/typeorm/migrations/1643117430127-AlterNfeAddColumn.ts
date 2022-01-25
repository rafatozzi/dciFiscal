import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNfeAddColumn1643117430127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE nfe ADD COLUMN `situacao` varchar(255) NOT NULL AFTER `status`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("nfe", "situacao");
    }

}
