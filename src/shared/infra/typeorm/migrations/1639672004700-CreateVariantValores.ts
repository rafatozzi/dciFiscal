import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVariantValores1639672004700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "variantes_valores",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_variante",
                    type: "varchar"
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
                    name: "FKVarianteValVariante",
                    referencedTableName: "variantes",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_variante"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("variantes_valores");
    }

}
