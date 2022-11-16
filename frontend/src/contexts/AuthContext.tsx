import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies"
import { api } from "../services/apiClient";
import Router from "next/router"
import {toast} from "react-toastify"

type AuthContextData = {
   user: UserProps;
   isAuthenticated: boolean;
   signIn: (credentials: SingInProps) => Promise<void>
   signUp: (credentials: SingUpProps) => Promise<void>;
   signOut: () => void;
}

type UserProps = {
   id: string;
   name: string;
   email: string;
}

type SingInProps = {
   email: string;
   password: string;
}

type SingUpProps = {
   name: string;
   email: string;
   password: string;
}

type AuthProviderProps = {
   children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
   try {
      destroyCookie(undefined, "@nextauth.token")
      Router.push("/")
   } catch {
      console.log("erro ao deslogar")
   }
}

export function AuthProvider({ children }: AuthProviderProps) {

   const [user, setUser] = useState<UserProps>();
   const isAuthenticated = !!user;

   async function signIn({ email, password }: SingInProps) {

      try {
         const response = await api.post("/session", {
            email,
            password
         })

         const { id, name, token } = response.data

         setCookie(undefined, "@nextauth.token", token, {
            maxAge: 60 * 60 * 24 * 30, // expire em 1 mes
            path: "/" // caminhos que terão acesso ao cookie
         });

         setUser({
            id,
            name,
            email,
         })

         // passar o token para as proximas requisições
         api.defaults.headers["Authorization"] = `Bearer ${token}`

         toast.success("Logado com Sucesso")
         Router.push("/dashboard");

      } catch (err) {
         toast.error("Erro ao acessar a conta")
      }
   }


   async function signUp({ name, email, password }: SingUpProps) {

      try {
         const response = await api.post("/users", {
            name,
            email,
            password
         })

         toast.success("Conta criada com sucesso");
         Router.push("/");
      } catch (err) {
         toast.error("Erro ao criar a conta");
      }
   }

   return (
      <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
         {children}
      </AuthContext.Provider>
   )
}