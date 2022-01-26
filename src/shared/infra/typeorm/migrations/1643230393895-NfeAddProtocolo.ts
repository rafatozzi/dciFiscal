import { MigrationInterface, QueryRunner } from "typeorm";

export class NfeAddProtocolo1643230393895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE nfe ADD COLUMN `protocolo` varchar(255) NOT NULL AFTER `recibo`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("nfe", "protocolo");
    }

}
