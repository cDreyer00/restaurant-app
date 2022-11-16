
import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../components/src/Header";
import styles from "../../styles/category.module.scss"
import { Input } from "../components/src/Input";

export default function Category() {

   const [name, setName] = useState('')

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      alert("categoria: " + name);
   }

   return (
      <>
         <Head>
            <title>Nova Categoria - Sabor Caseiro</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
               <h1>Cadastrar categorias</h1>

               <form onSubmit={handleRegister}>
                  <Input
                     type="text"
                     placeholder="Nome da categoria"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />

                  <button type="submit">
                     Cadastrar
                  </button>
               </form>
            </main>
         </div>
      </>
   )
}