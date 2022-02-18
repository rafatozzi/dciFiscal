import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFinanceiro1645216566167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "financeiro",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_caixa",
                    type: "varchar"
                },
                {
                    name: "id_ordem_servico_pgtos",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "descricao",
                    type: "varchar"
                },
                {
                    name: "credito",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "debito",
                    type: "decimal(12,2)",
                    default: 0
                },
                {
                    name: "excluir",
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
            ],
            foreignKeys: [
                {
                    name: "FKFinanceiroCaixa",
                    referencedTableName: "caixa",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_caixa"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKFinanceiroOrdemServicoPgto",
                    referencedTableName: "ordem_servico_pgtos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico_pgtos"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("financeiro");
    }

}
