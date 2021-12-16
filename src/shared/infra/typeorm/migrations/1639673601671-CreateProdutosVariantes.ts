import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutosVariantes1639673601671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "produtos_variantes",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_produtos",
                    type: "varchar",
                },
                {
                    name: "id_variante",
                    type: "varchar",
                },
                {
                    name: "id_variante_valores",
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
                    name: "FKProdVarProdutos",
                    referencedTableName: "produtos",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_produtos"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKProdVarVariantes",
                    referencedTableName: "variantes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_variante"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKProdVarVariantesVal",
                    referencedTableName: "variantes_valores",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_variante_valores"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos_variantes");
    }

}
