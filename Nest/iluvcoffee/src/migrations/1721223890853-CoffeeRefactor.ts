import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1721223890853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 更改的内容,如何更改的内容
    await queryRunner.query(
      `ALTER ATBLE "coffee" RENAME COLUMN "name" to "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 撤销或回滚更改的内容
    `ALTER ATBLE "coffee" RENAME COLUMN "title" to "name"`;
  }
}
