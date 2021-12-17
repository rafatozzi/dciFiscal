import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientes1639763515038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "clientes",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_cidades",
                    type: "int",
                },
                {
                    name: "fantasia",
                    type: "varchar",
                },
                {
                    name: "razao_social",
                    type: "varchar",
                },
                {
                    name: "cpf_cnpj",
                    type: "bigint(14)",
                },
                {
                    name: "rg_ie",
                    type: "bigint(14)",
                },
                {
                    name: "email",
                    type: "varchar(150)",
                },
                {
                    name: "telefone",
                    type: "bigint(11)",
                },
                {
                    name: "celular",
                    type: "bigint(11)",
                },
                {
                    name: "endereco",
                    type: "varchar",
                },
                {
                    name: "numero",
                    type: "int(5)",
                },
                {
                    name: "complemento",
                    type: "varchar",
                },
                {
                    name: "bairro",
                    type: "varchar(100)",
                },
                {
                    name: "cep",
                    type: "varchar(10)",
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
                    name: "FKClientesCidades",
                    referencedTableName: "cidades",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_cidades"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes")
    }

}
