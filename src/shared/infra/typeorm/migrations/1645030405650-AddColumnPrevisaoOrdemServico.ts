import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPrevisaoOrdemServico1645030405650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE ordem_servico ADD COLUMN `previsao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `descricao`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("ordem_servico", "previsao");
    }

}
