import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTipoCaixaFormaPgto1645188186870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE forma_pgto ADD COLUMN `tipo_caixa` int(3) NOT NULL DEFAULT '1' AFTER `tipo_recebimento`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("forma_pgto", "tipo_caixa");
    }

}
