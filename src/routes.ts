import { Router } from "express";
import BoardsController from "./controllers/BoardsController";

const routes = Router();

routes.get("/board/:id", BoardsController.show);
routes.post("/board/:id", BoardsController.create);
routes.post("/board", BoardsController.create);

export default routes;
