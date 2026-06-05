import { Request, Response } from "express";

class UploadController {

  async handle(req: Request, res: Response) {

    const file = req.file as Express.Multer.File;

    if (!file) {
      throw new Error("Erro ao enviar arquivo");
    }

    return res.json({
      imageUrl: `http://localhost:3333/files/${file.filename}`
    });
  }
}

export { UploadController };