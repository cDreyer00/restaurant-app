import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"
import logo from "../../public/logo.svg"
import { Input } from "../components/src/Input"

export default function Home() {
   return (
      <>
         <Head>
            <title>Sabor Caseiro - Login</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image src={logo} alt="Logo sabor caseiro" />

            <div className={styles.Login}>
               <form>
                  <Input placeholder="Email" type="text"/>
                  <Input placeholder="Senha" type="password"/>
               </form>
            </div>
         </div>
      </>
   )
}
