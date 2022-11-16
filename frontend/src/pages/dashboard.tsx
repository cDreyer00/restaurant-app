import { canSSRAuth } from "../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../components/src/Header"

export default function Dashboard() {
   return (
      <>
      <Head>
         <title>Painel - Sabor Caseiro</title>
      </Head>
      <div>
         <Header/>
         <h1>Dashboard</h1>
      </div>
      </>
   )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
   
   return {
      props: {}
   }
})