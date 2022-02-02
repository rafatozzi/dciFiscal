import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class HistEnvioContab1643807901803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "hist_envio_contabil",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "id_empresa",
                    type: "varchar"
                },
                {
                    name: "mes",
                    type: "varchar",
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
                    name: "FKHistEnvioContabilEmpresa",
                    referencedTableName: "empresas",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_empresa"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("hist_envio_contabil");
    }

}
