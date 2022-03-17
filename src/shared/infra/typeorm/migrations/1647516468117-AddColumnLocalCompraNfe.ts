import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnLocalCompraNfe1647516468117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `local_venda` varchar(255) NOT NULL AFTER `cep`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("pedidos", "local_venda");
    }

}
