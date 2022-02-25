import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddColumnStatusOrdemServico1645797284243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE ordem_servico ADD COLUMN `id_status` varchar(255) NOT NULL AFTER `id_user`");
        await queryRunner.createForeignKey(
            "ordem_servico",
            new TableForeignKey({
                name: "FKOrdemServicoStatus",
                referencedTableName: "status",
                referencedColumnNames: ["id"],
                columnNames: ["id_status"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("ordem_servico", "id_status");
        await queryRunner.dropForeignKey("ordem_servico", "FKOrdemServicoStatus");
    }

}
