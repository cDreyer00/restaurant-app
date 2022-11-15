import styles from "../../styles/home.module.scss"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"


import logo from "../../public/logo.svg"
import { Input } from "../components/src/Input"
import { Button } from "../components/src/button"

export default function Singup() {
   return (
      <>
         <Head>
            <title>Sabor Caseiro - Cadastrar conta</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image className={styles.logo} src={logo} alt="Logo sabor caseiro" />

            <div className={styles.login}>
               <form>
                  <Input placeholder="Nome" type="text" />
                  <Input placeholder="Email" type="text" />
                  <Input placeholder="Senha" type="password" />

                  <Button type="submit" loading={false}>Criar conta</Button>
               </form>

               <Link className={styles.text} href="/">
                  Já possui uma conta? Faça login
               </Link>
            </div>
         </div>
      </>
   )
}
