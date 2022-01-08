import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNfe1641648630878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "nfe",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_empresa",
                    type: "varchar"
                },
                {
                    name: "id_cliente",
                    type: "varchar"
                },
                {
                    name: "total",
                    type: "decimal(12,2)"
                },
                {
                    name: "desconto",
                    type: "decimal(12,2)"
                },
                {
                    name: "nr_nfe",
                    type: "int"
                },
                {
                    name: "recibo",
                    type: "varchar"
                },
                {
                    name: "chave",
                    type: "varchar"
                },
                {
                    name: "status",
                    type: "int"
                },
                {
                    name: "motivo",
                    type: "varchar"
                },
                {
                    name: "cancelado",
                    type: "boolean",
                    default: false
                },
                {
                    name: "cancel_motivo",
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
                    name: "FKNfeEmpresa",
                    referencedTableName: "empresas",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_empresa"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKNfeCliente",
                    referencedTableName: "clientes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cliente"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "nfe_produtos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_nfe",
                    type: "varchar"
                },
                {
                    name: "id_produto",
                    type: "varchar"
                },
                {
                    name: "qtd",
                    type: "decimal(12,3)"
                },
                {
                    name: "valor_unit",
                    type: "decimal(12,2)"
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
                    name: "FKNfeProdutoNfe",
                    referencedTableName: "nfe",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_nfe"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKNfeProdutoProdutos",
                    referencedTableName: "produtos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_produto"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "nfe_pgtos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_nfe",
                    type: "varchar"
                },
                {
                    name: "forma_pgto",
                    type: "int"
                },
                {
                    name: "valor",
                    type: "decimal(12,2)"
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
                    name: "FKNfePgtoNfe",
                    referencedTableName: "nfe",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_nfe"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("nfe_pgtos");
        await queryRunner.dropTable("nfe_produtos");
        await queryRunner.dropTable("nfe");
    }

}
