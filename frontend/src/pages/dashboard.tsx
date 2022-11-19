import styles from "../../styles/dashboard.module.scss"
import { useState } from "react"
import Router from "next/router"
import { canSSRAuth } from "../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../components/src/header"
import { setupAPIClient } from "../services/api"
import { FiRefreshCcw } from "react-icons/fi"
import { ModalOrder } from "../components/src/ModalOrder"

import Modal from "react-modal"
import { toast } from "react-toastify"
import { send } from "process"


export type OrderItemProps = {
   id: string;
   amount: number;
   order_id: string;
   product_id: string;
   product: {
      id: string;
      name: string;
      description: string;
      price: string;
      banner: string
   }
   order: {
      id: string;
      name: string | null;
      table: number
      draft: boolean;
      status: boolean;
   }
}


export default function Dashboard({ ordersList }) {

   const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
   const [modalVisible, setModalVisible] = useState(false);

   function handleUpdate() {
      Router.reload();
   }

   function handleCloseOrderDetails() {
      setModalVisible(false);
   }

   async function handleOrderDetails(id: string) {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/order/detail", {
         params: {
            order_id: id,
         }
      });

      setModalItem(response.data);
      setModalVisible(true);
   }


   async function handleCompleteOrder(id: string) {
      const api = setupAPIClient();
      try {
         await api.put("/order/complete", {
            order_id: id
         })         

         setModalVisible(false);
         toast.success("Pedido Concluido");
         handleUpdate();
      } catch (err) {
         console.log(err)
         toast.error("não foi possivel concluir o pedido, atualize a pagina e tente novamente");
      }
   }

   Modal.setAppElement("#__next");

   return (
      <>
         <Head>
            <title>Painel - Sabor Caseiro</title>
         </Head>
         <div>
            <Header />
            <div className={styles.container}>
               <div className={styles.containerHeader}>
                  <h1>Pedidos</h1>
                  <button onClick={handleUpdate}>
                     <FiRefreshCcw size={25} color="#3fffa3" />
                  </button>

               </div>
               <div className={styles.orders}></div>
               <article className={styles.listOrders}>
                  {ordersList.map((item) => {
                     return (
                        <section className={styles.orderItem} key={item.id}>
                           <button onClick={() => handleOrderDetails(item.id)}>
                              <div className={styles.tag}></div>
                              <span>Mesa <strong>{item.table}</strong></span>
                           </button>
                        </section>
                     )
                  })}
               </article>

            </div>
         </div>

         {modalVisible && (
            <ModalOrder
               isOpen={modalVisible}
               onRequestClose={handleCloseOrderDetails}
               items={modalItem}
               handleCompleteOrder={handleCompleteOrder}
            />
         )}
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

   const apiClinet = setupAPIClient(ctx);
   const response = await apiClinet.get("/orders")

   return {
      props: {
         ordersList: response.data
      }
   }
})