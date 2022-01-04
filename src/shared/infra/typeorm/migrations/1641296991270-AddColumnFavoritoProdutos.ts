import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFavoritoProdutos1641296991270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE produtos ADD COLUMN `favorito` tinyint(1) NOT NULL DEFAULT '0' AFTER `preco`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("produtos", "favorito");
    }

}
