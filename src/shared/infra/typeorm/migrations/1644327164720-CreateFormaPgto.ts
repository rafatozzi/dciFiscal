import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormaPgto1644327164720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "forma_pgto",
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
                    name: "max_parcelas",
                    type: "int(4)"
                },
                {
                    name: "intervalo_parcelas",
                    type: "int(4)"
                },
                {
                    name: "primeira_parcela_dias",
                    type: "int(4)"
                },
                {
                    name: "tipo_recebimento",
                    type: "varchar(25)"
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
        }));

        await queryRunner.createTable(new Table({
            name: "forma_pgto_band",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_forma_pgto",
                    type: "varchar"
                },
                {
                    name: "nome",
                    type: "varchar"
                },
                {
                    name: "taxa_recebimento",
                    type: "decimal(12,2)"
                },
                {
                    name: "recebimento_dias",
                    type: "int(4)"
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
                    name: "FKFormaPgtoBandeira",
                    referencedTableName: "forma_pgto",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_forma_pgto"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "forma_pgto_band_taxas",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_forma_pgto_band",
                    type: "varchar"
                },
                {
                    name: "nr_parcela",
                    type: "int(4)"
                },
                {
                    name: "porcentagem",
                    type: "decimal(12,2)"
                },
                {
                    name: "taxa_adiantamento",
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
                    name: "FKFormaPgtoBandeiraTaxas",
                    referencedTableName: "forma_pgto_band",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_forma_pgto_band"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("forma_pgto_band_taxas");
        await queryRunner.dropTable("forma_pgto_band");
        await queryRunner.dropTable("forma_pgto");
    }

}
