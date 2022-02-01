import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnEmailContadorEmpresa1643717409135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE empresas ADD COLUMN `email_contabilidade` varchar(255) NOT NULL AFTER `venc_cert`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("empresas", "email_contabilidade");
    }

}
