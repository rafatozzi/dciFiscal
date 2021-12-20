import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPedidos1640001431757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `desconto` DECIMAL(12,2) NOT NULL AFTER `total`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("pedidos", "desconto");
    }

}
