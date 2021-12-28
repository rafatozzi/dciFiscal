import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPedidos1640717288769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `endereco` varchar(255) NOT NULL AFTER `desconto`");
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `numero` int(5) NOT NULL AFTER `endereco`");
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `complemento` varchar(255) NOT NULL AFTER `numero`");
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `bairro` varchar(100) NOT NULL AFTER `complemento`");
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `cep` varchar(10) NOT NULL AFTER `bairro`");
        await queryRunner.query("ALTER TABLE pedidos ADD COLUMN `id_cidades` int(11) NOT NULL AFTER `id_cliente`");

        await queryRunner.query("ALTER TABLE pedidos ADD KEY `FKPedidosCidades` (`id_cidades`)");
        await queryRunner.query("ALTER TABLE pedidos ADD CONSTRAINT FKPedidosCidades FOREIGN KEY (id_cidades) REFERENCES cidades (id) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("pedidos", "endereco");
        await queryRunner.dropColumn("pedidos", "numero");
        await queryRunner.dropColumn("pedidos", "complemento");
        await queryRunner.dropColumn("pedidos", "bairro");
        await queryRunner.dropColumn("pedidos", "cep");
        await queryRunner.dropColumn("pedidos", "id_cidades");
    }

}
