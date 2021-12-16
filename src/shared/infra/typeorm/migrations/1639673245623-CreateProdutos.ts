import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutos1639673245623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "produtos",
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
                    name: "cod_barras",
                    type: "varchar(20)"
                },
                {
                    name: "ncm",
                    type: "varchar(15)"
                },
                {
                    name: "cfop",
                    type: "int(5)"
                },
                {
                    name: "unid_med",
                    type: "varchar(10)"
                },
                {
                    name: "preco",
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
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos")
    }

}
