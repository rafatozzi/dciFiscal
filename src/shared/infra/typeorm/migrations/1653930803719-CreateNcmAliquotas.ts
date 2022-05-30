import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNcmAliquotas1653930803719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "ncm_aliquotas",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "ncm",
                    type: "varchar(15)"
                },
                {
                    name: "tributo_nacional",
                    type: "decimal(12,2)"
                },
                {
                    name: "tributo_estadual",
                    type: "decimal(12,2)"
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
        await queryRunner.dropTable("ncm_aliquotas");
    }

}
