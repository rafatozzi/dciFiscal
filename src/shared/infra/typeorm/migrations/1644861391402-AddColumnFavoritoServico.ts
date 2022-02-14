import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFavoritoServico1644861391402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE servicos ADD COLUMN `favorito` tinyint(1) NOT NULL DEFAULT '0' AFTER `valor`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("servicos", "favorito");
    }

}
