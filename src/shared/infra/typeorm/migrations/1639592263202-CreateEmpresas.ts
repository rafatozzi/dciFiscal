import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmpresas1639592263202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "empresas",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_cidades",
                    type: "int"
                },
                {
                    name: "razao",
                    type: "varchar"
                },
                {
                    name: "fantasia",
                    type: "varchar"
                },
                {
                    name: "cnpj",
                    type: "bigint(14)"
                },
                {
                    name: "ie",
                    type: "bigint(14)"
                },
                {
                    name: "crt",
                    type: "tinyint(1)"
                },
                {
                    name: "cep",
                    type: "int(8)"
                },
                {
                    name: "fone",
                    type: "bigint(11)"
                },
                {
                    name: "nr",
                    type: "int(11)"
                },
                {
                    name: "bairro",
                    type: "varchar(100)"
                },
                {
                    name: "complemento",
                    type: "varchar(150)"
                },
                {
                    name: "endereco",
                    type: "varchar(150)"
                },
                {
                    name: "nr_nfe",
                    type: "int"
                },
                {
                    name: "serie_nfe",
                    type: "int(4)"
                },
                {
                    name: "ambiente",
                    type: "tinyint(1)"
                },
                {
                    name: "senha_cert",
                    type: "varchar(50)"
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
                    name: "FKEmpresasCidades",
                    referencedTableName: "cidades",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cidades"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("empresas");
    }

}
