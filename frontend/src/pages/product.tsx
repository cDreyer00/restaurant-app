import { useState, ChangeEvent, FormEvent } from "react"
import Head from "next/head"
import styles from "../../styles/product.module.scss"

import { canSSRAuth } from "../utils/canSSRAuth"
import { Header } from "../components/src/Header"
import { Input, TextArea } from "../components/src/Input"
import { FiUpload } from "react-icons/fi"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { toast } from "react-toastify"


export type ProductRequest = {
   id: string
   name: string;
   price: string;
   description: string;
   image: string;
}

export default function Product({ categoryList }) {

   const [imageAvatar, setImageAvatar] = useState(null)
   const [avatarURL, setAvatarURL] = useState("");

   const [categorySelected, setCategorySelected] = useState<ProductRequest>()
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");

   if(!categorySelected){
      setCategorySelected(categoryList[0]);
   }

   function handleFile(e: ChangeEvent<HTMLInputElement>) {

      if (!e.target.files) {
         return;
      }

      const image = e.target.files[0];

      if (!image) {
         return;
      }

      let availableFormats = "image/jpeg" && "image/png";

      if (image.type === availableFormats) {
         setImageAvatar(image);
         setAvatarURL(URL.createObjectURL(image))
      }
   }

   function handleSlectCategory(e: ChangeEvent<HTMLSelectElement>){
      const category = categoryList.find((item) => {
         return item.name === e.target.value
      })
      setCategorySelected(category);
   }

   async function handleProductSubmit(e:FormEvent){
      e.preventDefault();

      if(name === "" || description === "" || price === "" || imageAvatar === null){
         toast.error("Preencha todos os campos")
         return;
      }

      try{
         const data = new FormData();

         data.append("name", name);
         data.append("price", price);
         data.append("description", description);
         data.append("category_id", categorySelected.id);
         data.append("banner", imageAvatar);
         
         const apiClient = setupAPIClient();
         await apiClient.post("/product", data);

         toast.success("Produto cadastrado com sucesso"); 

         // resetar valores ao fazer cadastro
         setName("");
         setDescription("");
         setPrice("");
         setAvatarURL(null);

      }catch(err){
         toast.error("Erro ao cadastrar produto " + err)
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

               <form onSubmit={handleProductSubmit}>
                  <label className={styles.labelAvatar}>
                     <span>
                        <FiUpload size={25} color="#FFF" />
                     </span>

                     <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

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

                  <select onChange={handleSlectCategory} defaultValue={categoryList[0].name}>
                     {categoryList.map((item) => {
                        return (
                           <option key={item.name}>{item.name}</option>
                        )
                     })}
                  </select>
                  <Input type="text" placeholder="Nome"  onChange={(e) => setName(e.target.value)} value={name}/>
                  <Input type="text" placeholder="Valor" onChange={(e) => setPrice(e.target.value)} value={price}/>
                  <TextArea placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description}/>

                  <button>Cadastrar</button>
               </form>
            </main>
         </div>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

   const apiClient = setupAPIClient(ctx);
   const response = await apiClient.get("/category");

   return {
      props: {
         categoryList: response.data
      }
   }
})
