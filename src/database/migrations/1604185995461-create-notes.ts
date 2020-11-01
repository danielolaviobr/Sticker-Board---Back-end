import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNotes1604185995461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "note_text",
            type: "text",
          },
          {
            name: "note_id",
            type: "text",
          },

          {
            name: "board_id",
            type: "integer",
          },
          {
            name: "position_x",
            type: "integer",
          },
          {
            name: "position_y",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "NoteBoard",
            columnNames: ["board_id"],
            referencedTableName: "boards",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notes");
  }
}
