import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAgendamento1645036306494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "agendamento",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_cliente",
                    type: "varchar",
                },
                {
                    name: "data_agendamento",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "descricao",
                    type: "varchar"
                },
                {
                    name: "urgente",
                    type: "boolean",
                    default: false
                },
                {
                    name: "concluido",
                    type: "boolean",
                    default: false
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
                    name: "FKAgendamentoCliente",
                    referencedTableName: "clientes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cliente"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("agendamento");
    }

}
