import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1730470723141 implements MigrationInterface {
    name = 'Initial1730470723141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orderdetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "CHK_1c730c42bc619e61b51e3819f0" CHECK ("price" != null), CONSTRAINT "PK_cf4437dc89cc45584aba8c340cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "userId" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "CHK_f0a7386205fd27bf2089cb113f" CHECK ("password" != null), CONSTRAINT "CHK_9885e8d2e772b71f06fce75775" CHECK ("email" != null), CONSTRAINT "CHK_ff3d64475f85f44874e5ef5a8a" CHECK ("name" != null), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "CHK_e5e6ad47d93abfd73075c7d690" CHECK ("name" != null), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL, "categoriesId" uuid, CONSTRAINT "CHK_1446505ab75095c921a0a05ed3" CHECK ("stock" != null), CONSTRAINT "CHK_05dd037b27db11c87a84a14caf" CHECK ("price" != null), CONSTRAINT "CHK_56976350f0e297986a89d48353" CHECK ("description" != null), CONSTRAINT "CHK_9b325cb4f7ef9d3d75e11c49cb" CHECK ("name" != null), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_orderdetails" ("productsId" uuid NOT NULL, "orderdetailsId" uuid NOT NULL, CONSTRAINT "PK_62fa9e6e94a65a4b3610280f626" PRIMARY KEY ("productsId", "orderdetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0d2d42918865033038aae4f48" ON "products_order_details_orderdetails" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d7d30a0c4fc0d417beecff5d71" ON "products_order_details_orderdetails" ("orderdetailsId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "orderdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" ADD CONSTRAINT "FK_f0d2d42918865033038aae4f481" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" ADD CONSTRAINT "FK_d7d30a0c4fc0d417beecff5d719" FOREIGN KEY ("orderdetailsId") REFERENCES "orderdetails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" DROP CONSTRAINT "FK_d7d30a0c4fc0d417beecff5d719"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" DROP CONSTRAINT "FK_f0d2d42918865033038aae4f481"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7d30a0c4fc0d417beecff5d71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0d2d42918865033038aae4f48"`);
        await queryRunner.query(`DROP TABLE "products_order_details_orderdetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderdetails"`);
    }

}
