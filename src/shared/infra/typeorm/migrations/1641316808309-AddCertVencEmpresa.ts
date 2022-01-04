import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCertVencEmpresa1641316808309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE empresas ADD COLUMN `venc_cert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `senha_cert`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("empresas", "venc_cert");
    }

}
