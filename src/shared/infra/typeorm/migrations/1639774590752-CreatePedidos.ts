import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedidos1639774590752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "pedidos",
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
                    name: "FKPedidosEmpresa",
                    referencedTableName: "empresas",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_empresa"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKPedidosCliente",
                    referencedTableName: "clientes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cliente"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "pedidos_produtos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_pedidos",
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
                    name: "FKPedProdutoPedidos",
                    referencedTableName: "pedidos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_pedidos"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKPedProdutoProdutos",
                    referencedTableName: "produtos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_produto"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "pedidos_pgtos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_pedidos",
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
                    name: "FKPedPgtoPedidos",
                    referencedTableName: "pedidos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_pedidos"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos_pgtos");
        await queryRunner.dropTable("pedidos_produtos");
        await queryRunner.dropTable("pedidos");
    }

}
