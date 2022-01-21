import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNfeXml1642791074138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `nfe_xml` CHANGE `xml` `xml` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `nfe_xml` CHANGE `xml` `xml` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL");
    }

}
