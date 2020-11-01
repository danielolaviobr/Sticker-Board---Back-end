import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Board from "./Board";

@Entity("notes")
export default class Notes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  note_id: string;

  @Column()
  note_text: string;

  @Column()
  position_x: number;

  @Column()
  position_y: number;

  @ManyToOne(() => Board, (board) => board.notes)
  @JoinColumn({ name: "board_id" })
  board: Board;
}
