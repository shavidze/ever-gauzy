
import { MigrationInterface, QueryRunner } from "typeorm";
import { DEFAULT_INTEGRATIONS, PROJECT_MANAGE_DEFAULT_INTEGRATIONS } from "./../../integration/default-integration";
import { IntegrationsUtils } from "./../../integration/utils";

export class SeedIntegrationsAndIntegrationTypes1695112275840 implements MigrationInterface {

    name = 'SeedIntegrationsAndIntegrationTypes1695112275840';

    /**
    * Up Migration
    *
    * @param queryRunner
    */
    public async up(queryRunner: QueryRunner): Promise<any> {
        await IntegrationsUtils.upsertIntegrationsAndIntegrationTypes(queryRunner, PROJECT_MANAGE_DEFAULT_INTEGRATIONS);
        await IntegrationsUtils.upsertIntegrationsAndIntegrationTypes(queryRunner, DEFAULT_INTEGRATIONS);
    }
    /**
    * Down Migration
    *
    * @param queryRunner
    */
    public async down(queryRunner: QueryRunner): Promise<any> { }
}
