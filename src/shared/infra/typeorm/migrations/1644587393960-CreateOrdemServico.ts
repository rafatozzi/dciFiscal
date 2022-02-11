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

        await queryRunner.createTable(new Table({
            name: "ordem_servico_servicos",
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
                    name: "id_servico",
                    type: "varchar"
                },
                {
                    name: "quantidade",
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
                    name: "FKOrdemServicoServicoOrdemServ",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOrdemServicoServicoServico",
                    referencedTableName: "servicos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "ordem_servico_produtos",
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
                    name: "id_produto",
                    type: "varchar"
                },
                {
                    name: "quantidade",
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
                    name: "FKOrdemServicoProdutosOrdemServ",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOrdemServicoProdutosProduto",
                    referencedTableName: "produtos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_produto"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "ordem_servico_obs",
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
                    name: "observacao",
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
                    name: "FKOrdemServicoObsOrdemServ",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "ordem_servico_pgtos",
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
                    name: "id_forma_pgto",
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
                    name: "FKOrdemServicoFormaPgtoOrdemServ",
                    referencedTableName: "ordem_servico",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_ordem_servico"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOrdemServicoFormaPgtoPgto",
                    referencedTableName: "forma_pgto",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_forma_pgto"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ordem_servico_pgtos");
        await queryRunner.dropTable("ordem_servico_obs");
        await queryRunner.dropTable("ordem_servico_produtos");
        await queryRunner.dropTable("ordem_servico_servicos");
        await queryRunner.dropTable("order_servico_status");
        await queryRunner.dropTable("ordem_servico");
    }

}