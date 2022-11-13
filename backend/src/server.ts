import express, { Request, Response, NextFunction } from "express"
import "express-async-errors";
import cors from "cors";
import path from "path"

import { router } from "./routes";

const app = express();
app.use(express.json()); // tipo de dado que vai ser usado
app.use(cors()); // pra qualquer ip poder fazer requisição

app.use(router); // usar as rotas criadas no routes

// criar rota para os arquivos do "tmp"
app.use(
   "/files",
   express.static(path.resolve(__dirname, "../tmp"))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   // se o err for do tipo "Error"
   if (err instanceof Error) {
      return res.status(400).json({
         error: err.message
      })
   }

   return res.status(500).json({
      status: "error",
      message: "internal server error"
   })
})

app.listen(3333, () => console.log("Server running"))