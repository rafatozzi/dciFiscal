import { MigrationInterface, QueryRunner } from "typeorm";

export class AddValorPgtoPedido1641327686876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `valor_pago` DECIMAL(12,2) NOT NULL AFTER `desconto`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("pedidos", "valor_pago");
    }

}
