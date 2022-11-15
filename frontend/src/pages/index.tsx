import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"

import logo from "../../public/logo.svg"
import { Input } from "../components/src/Input"
import { Button } from "../components/src/button"

export default function Home() {
   return (
      <>
         <Head>
            <title>Sabor Caseiro - Login</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image className={styles.logo} src={logo} alt="Logo sabor caseiro" />

            <div className={styles.login}>
               <form>
                  <Input placeholder="Email" type="text" />
                  <Input placeholder="Senha" type="password" />

                  <Button type="submit" loading={false}>Acessar</Button>
               </form>

               <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </div>
         </div>
      </>
   )
}
