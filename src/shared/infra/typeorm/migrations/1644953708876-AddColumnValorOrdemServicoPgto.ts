import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnValorOrdemServicoPgto1644953708876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE ordem_servico_pgtos ADD COLUMN `valor` decimal(12,2) NOT NULL DEFAULT '0' AFTER `id_forma_pgto_band`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("ordem_servico_pgtos", "valor");
    }

}
