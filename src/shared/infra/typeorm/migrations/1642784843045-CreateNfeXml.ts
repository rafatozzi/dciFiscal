import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNfeXml1642784843045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "nfe_xml",
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
                    name: "acao",
                    type: "varchar"
                },
                {
                    name: "xml",
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
                    name: "FKNfeXmlNfe",
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
        await queryRunner.dropTable("nfe_xml");
    }

}
