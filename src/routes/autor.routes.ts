import { Router } from "express";
import AutorController from "../controllers/autorController";

const autorRoutes = Router();
autorRoutes.get("/", AutorController.getAll);
autorRoutes.get("/:numero", AutorController.getByNumero);
autorRoutes.post("/", AutorController.createAutor);
autorRoutes.post("/:numero/livro", AutorController.createLivro);
autorRoutes.get("/:numero/livro", AutorController.getLivrosAutor);

export default autorRoutes;
