import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRevokedTokens1792774816760 implements MigrationInterface {
    name = 'AddRevokedTokens1792774816760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "revoked_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" character varying(255) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5c2b3ed5a8f0e4972e358985038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6101486a8dd1eacfd4cd5cfcbe" ON "revoked_tokens"  ("token_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6101486a8dd1eacfd4cd5cfcbe"`);
        await queryRunner.query(`DROP TABLE "revoked_tokens"`);
    }

}
