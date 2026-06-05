import crypto from 'crypto';
import multer from 'multer';

import { resolve } from 'path';

export default {

  // Função responsável por configurar upload
  upload(folder: string) {

    return {

      storage: multer.diskStorage({

        // Define a pasta onde os arquivos serão salvos
        destination: resolve(
          __dirname,
          '..',
          '..',
          folder
        ),

        // Define o nome final do arquivo
        filename: (request, file, callback) => {

          // Gera um hash aleatório
          // Evita conflito entre arquivos com mesmo nome
          const fileHash =
            crypto.randomBytes(16).toString("hex");

          // Nome final do arquivo
          // Exemplo:
          // a8d7f9-trex.png
          const fileName =
            `${fileHash}-${file.originalname}`;

          // Retorna o nome para o multer salvar
          return callback(null, fileName);
        }

      })

    }

  }

}