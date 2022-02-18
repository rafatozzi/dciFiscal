import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCaixa1645191321493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "caixa",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "valor_inicial",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "dinheiro",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "cartao_credito",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "cartao_debito",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "fechado",
                    type: "boolean",
                    default: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("caixa");
    }

}
