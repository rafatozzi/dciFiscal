import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFavoritoClientes1641297164249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE clientes ADD COLUMN `favorito` tinyint(1) NOT NULL DEFAULT '0' AFTER `cep`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("clientes", "favorito");
    }

}
