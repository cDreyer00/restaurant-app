import styles from "../../styles/home.module.scss"
import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { AuthContext } from "../contexts/AuthContext"


import logo from "../../public/logo.svg"
import { Input } from "../components/src/Input"
import { Button } from "../components/src/button"

export default function Singup() {

   const {signUp} = useContext(AuthContext);

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);


   async function handleSignUp(event: FormEvent) {
      event.preventDefault();

      if (name === "" || email === "" || password === "") {
         alert("preencha todos os campos")
         return;
      }

      setLoading(true);

      let data ={
         name,
         email,
         password
      }

      await signUp(data);
   }

   return (
      <>
         <Head>
            <title>Sabor Caseiro - Cadastrar conta</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image className={styles.logo} src={logo} alt="Logo sabor caseiro" />

            <div className={styles.login}>
               <form onSubmit={handleSignUp}>
                  <Input placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                  <Button type="submit" loading={loading}>Criar conta</Button>
               </form>

               <Link className={styles.text} href="/">
                  Já possui uma conta? Faça login
               </Link>
            </div>
         </div>
      </>
   )
}
