import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdemServico1644587393960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "ordem_servico",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "id_cliente",
                    type: "varchar",
                },
                {
                    name: "id_user",
                    type: "varchar",
                },
                {
                    name: "descricao",
                    type: "varchar",
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
                    name: "FKOrdemServicoCliente",
                    referencedTableName: "clientes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cliente"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOrdemServicoUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_user"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "order_servico_status",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "id_ordem_servico",
                    type: "varchar"
                },
                {
                    name: "id_status",
                    type: "varchar"
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
                    name: "FKOrdemServicoStatusOrdemServ",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOrdemServicoStatusStatus",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_status"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_servico_status");
        await queryRunner.dropTable("ordem_servico");
    }

}