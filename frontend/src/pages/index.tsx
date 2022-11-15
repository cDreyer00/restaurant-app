import { FormEvent, useContext, useState } from "react"
import styles from "../../styles/home.module.scss"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import logo from "../../public/logo.svg"
import { Input } from "../components/src/Input"
import { Button } from "../components/src/button"

import { AuthContext } from "../contexts/AuthContext"

export default function Login() {
   const { signIn } = useContext(AuthContext);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [loading, setLoading] = useState(false);

   async function handleLogin(event: FormEvent) {
      event.preventDefault();

      if(email == "" || password=== ""){
         alert("Preencha os dados")
         return;
      }

      setLoading(true);

      let data = {
         email,
         password
      }

      await signIn(data)
      setLoading(false);
   }

   return (
      <>
         <Head>
            <title>Sabor Caseiro - Login</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image className={styles.logo} src={logo} alt="Logo sabor caseiro" />

            <div className={styles.login}>
               <form onSubmit={handleLogin}>
                  <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                  <Button type="submit" loading={loading}>Acessar</Button>
               </form>

               <Link className={styles.text} href="/signup">
                  Não possui uma conta? Cadastre-se
               </Link>
            </div>
         </div>
      </>
   )
}
