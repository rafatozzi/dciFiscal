import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCidades1639504122828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "uf",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nome",
                    type: "varchar"
                },
                {
                    name: "uf",
                    type: "varchar(2)"
                },
                {
                    name: "ibge",
                    type: "int(2)"
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "cidades",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "id_uf",
                    type: "integer"
                },
                {
                    name: "nome",
                    type: "varchar"
                },
                {
                    name: "ibge",
                    type: "integer(7)"
                }
            ],
            foreignKeys: [
                {
                    name: "FKCidadesUf",
                    referencedTableName: "uf",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_uf"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("uf");
        await queryRunner.dropTable("cidades");
    }

}
