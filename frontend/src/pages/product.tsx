import { useState, ChangeEvent } from "react"
import Head from "next/head"
import styles from "../../styles/product.module.scss"

import { canSSRAuth } from "../utils/canSSRAuth"

import { Header } from "../components/src/Header"
import { Input, TextArea } from "../components/src/Input"

import { FiUpload } from "react-icons/fi"

export default function Product() {

   const [avatarURL, setAvatarURL] = useState("");
   const [imageAvatar, setImageAvatar] = useState(null)

   function handleFile(e: ChangeEvent<HTMLInputElement>) {

      if(!e.target.files){
         return;
      }

      const image = e.target.files[0];

      if(!image){
         return;
      }

      let availableFormats = "image/jpeg" && "image/png";

      if(image.type === availableFormats){
         setImageAvatar(image);
         setAvatarURL(URL.createObjectURL(image))
      }
   }

   return (
      <>
         <Head>
            <title>Novo Produto - Sabor Caseiro</title>
         </Head>
         <div>
            <Header />


            <main className={styles.container}>
               <h1>Novo Produto</h1>

               <form>
                  <label className={styles.labelAvatar}>
                     <span>
                        <FiUpload size={25} color="#FFF" />
                     </span>

                     <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                     {avatarURL && (
                        <img
                           className={styles.productImage}
                           src={avatarURL}
                           alt="Foto do Produto"
                           width={250}
                           height={250}
                        />
                     )}

                  </label>

                  <select>
                     <option>test</option>
                     <option>test2</option>

                  </select>
                  <Input type="text" placeholder="Nome" />
                  <Input type="text" placeholder="Valor" />
                  <TextArea placeholder="Descrição" />

                  <button>Cadastrar</button>
               </form>
            </main>
         </div>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   console.log("ctx");
   return {
      props: {}
   }
})
