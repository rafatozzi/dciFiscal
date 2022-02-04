import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServico1643976282762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "servicos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "nome",
                    type: "varchar"
                },
                {
                    name: "recorrente",
                    type: "boolean",
                    default: false
                },
                {
                    name: "recorrente_dias",
                    type: "int",
                    default: 0
                },
                {
                    name: "valor",
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
            ]
        }))

        await queryRunner.createTable(new Table({
            name: "servicos_ckecklist",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_servico",
                    type: "varchar",
                },
                {
                    name: "nome",
                    type: "varchar"
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
                    name: "FKServCkeckListServ",
                    referencedTableName: "servicos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "servicos_comissao",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_servico",
                    type: "varchar",
                },
                {
                    name: "id_user",
                    type: "varchar",
                },
                {
                    name: "comissao",
                    type: "int",
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
                    name: "FKServComissaoServ",
                    referencedTableName: "servicos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKServComissaoUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_user"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("servicos");
        await queryRunner.dropTable("servicos_ckecklist");
        await queryRunner.dropTable("servicos_comissao");
    }

}
