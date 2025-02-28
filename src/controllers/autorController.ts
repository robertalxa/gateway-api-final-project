import { randomUUID } from "crypto";
import { Response, Request } from "express";
import zod from "zod";

const autorPostSchema = zod.object({
  numero: zod.number(),
  Nome: zod.string(),
});

const livroPostSchema = zod.object({
  numero: zod.number(),
  Titulo: zod.string(),
  Edicao: zod.string(),
  ISBN: zod.string(),
  Categoria: zod.string(),
});

interface Autor {
  id?: string;
  numero: number;
  Nome: string;
  livros?: Livro[];
}

interface Livro {
  id?: string;
  numero: number;
  Titulo: string;
  Edicao: string;
  ISBN: string;
  Categoria: string;
}

let autores: Autor[] = [];

export default class AutorController {
  static getAll(req: Request, res: Response) {
    res.json(autores);
  }

  static createAutor(req: Request, res: Response) {
    const { body } = req;
    if (!body) {
      res.sendStatus(404);
      return;
    }

    if (autorPostSchema.safeParse(body).error) {
      res.sendStatus(400);
      return;
    }

    const existeOutroAutorComMesmoNumero = autores.find(
      (autor) => autor.numero === body.numero
    );

    if (existeOutroAutorComMesmoNumero) {
      res.sendStatus(400);
      return;
    }

    autores.push({
      id: randomUUID(),
      ...body,
      livros: [],
    });

    res.json(autores);
  }

  static getByNumero(req: Request, res: Response) {
    const { numero } = req.params;

    if (!numero) {
      res.sendStatus(400);
      return;
    }

    const numeroConvertido = parseInt(numero);

    if (isNaN(numeroConvertido)) {
      res.sendStatus(400);
      return;
    }

    const autor = autores.find((autor) => autor.numero === numeroConvertido);
    if (!autor) {
      res.sendStatus(404);
      return;
    }

    res.json(autor);
  }

  static createLivro(req: Request, res: Response) {
    const { body } = req;
    const { numero } = req.params;
    if (!body || !numero) {
      res.sendStatus(404);
      return;
    }

    const numeroAutorConvertido = parseInt(numero);

    if (isNaN(numeroAutorConvertido)) {
      res
        .json({
          message: "Parâmetro inválido",
        })
        .sendStatus(400);
      return;
    }

    const autorIndex = autores.findIndex(
      (autor) => autor.numero === numeroAutorConvertido
    );

    if (autorIndex === -1) {
      res
        .json({
          message: "Autor não encontrado",
        })
        .sendStatus(404);
      return;
    }

    const autor = autores[autorIndex];

    if (livroPostSchema.safeParse(body).error) {
      res
        .json({
          message: "Body Inválido",
        })
        .sendStatus(400);
      return;
    }

    if (!autor.livros) {
      autor.livros = [];
    }

    autor.livros.push({ id: randomUUID(), ...body });

    res.json(autor);
  }

  static getLivrosAutor(req: Request, res: Response) {
    const { numero } = req.params;
    if (!numero) {
      res.sendStatus(404);
      return;
    }

    const numeroAutorConvertido = parseInt(numero);

    if (isNaN(numeroAutorConvertido)) {
      res
        .json({
          message: "Parâmetro inválido",
        })
        .sendStatus(400);
      return;
    }

    const autorIndex = autores.findIndex(
      (autor) => autor.numero === numeroAutorConvertido
    );

    if (autorIndex === -1) {
      res
        .json({
          message: "Autor não encontrado",
        })
        .sendStatus(404);
      return;
    }

    res.json(autores[autorIndex].livros || []);
  }
}
