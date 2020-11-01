import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Notes from "./Note";

@Entity("boards")
export default class Boards {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  board_code: string;

  @OneToMany(() => Notes, (note) => note.board, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "board_id" })
  notes: Notes[];
}
