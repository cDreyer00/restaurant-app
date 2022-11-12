import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";

interface PayLoad {
   sub: string;

}

export function IsAuthentticated(req: Request, res: Response, next: NextFunction) {
   // receber e verificar token 
   const authToken = req.headers.authorization;

   if (!authToken) {
      return res.status(401).end();
   }

   // dividir token do prefixo
   const [, token] = authToken.split(" ")

   try {
      // validar token
      const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad

      // pegar id do token e colocar em uma variavel do request
      req.user_id = sub;
      
      // prosseguir 
      return next();

   } catch (err) {
      return res.status(401).end();
   }

}