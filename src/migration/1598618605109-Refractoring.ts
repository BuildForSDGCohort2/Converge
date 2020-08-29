import {MigrationInterface, QueryRunner} from "typeorm";

export class Refractoring1598618605109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {  
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`, undefined);
        await queryRunner.query(`DROP TABLE "User"`, undefined);
    }

}
