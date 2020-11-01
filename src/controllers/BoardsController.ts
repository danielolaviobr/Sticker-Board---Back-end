import { Request, Response } from "express";
import { getRepository } from "typeorm";
import shortid from "shortid";

import Board from "../models/Board";
import Note from "../models/Note";

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const boardRepository = getRepository(Board);

    const board = await boardRepository.findOne({
      where: [{ board_code: id }],
      relations: ["notes"],
    });

    if (!board) {
      return response.status(404).json({ message: "Page not found" });
    }

    const re = /(\/\/line-break)/g;

    board.notes.map((note: Note) => {
      note.note_text = note.note_text.replace(re, "\n");
    });

    return response.status(200).json(board);
  },
  async create(request: Request, response: Response) {
    const { notes } = request.body;
    const { id } = request.params;

    const board_code = shortid()
      .replace("-", "0")
      .replace("_", "0")
      .replace("/", "0")
      .replace("\\", "0");

    const re = /\r?\n|\r/g;

    notes.map((note: Note) => {
      note.note_text = note.note_text.replace(re, "//line-break");
    });

    const data = {
      board_code,
      notes,
    };

    const boardRepository = getRepository(Board);

    const idValidation = await boardRepository.findOne({
      where: { board_code: id },
    });

    if (idValidation && id) {
      const board = await boardRepository.findOneOrFail({
        where: [{ board_code: id }],
      });

      await boardRepository.remove(board);

      data.board_code = id;
    } else if (id) {
      data.board_code = id;
    }

    const board = boardRepository.create(data);

    await boardRepository.save(board);

    return response.status(200).json(board);
  },
};
