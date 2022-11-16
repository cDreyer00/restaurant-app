import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";


// funcao para paginas que so podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
   return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

      const cookies = parseCookies(ctx);

      // se ja tiver logado, redirecionar para pagina permitida
      if (cookies["@nextauth.token"]) {
         return {
            redirect: {
               destination: "/dashboard",
               permanent: false,
            }
         }
      }
      return await fn(ctx);
   }
}