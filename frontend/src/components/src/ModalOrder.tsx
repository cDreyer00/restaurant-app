import Modal from "react-modal";
import styles from "../styles/styles.module.scss"

import { FiX } from "react-icons/fi";
import { StringMappingType } from "typescript";
import { OrderItemProps } from "../../pages/dashboard";


interface ModalOrderProps {
   isOpen: boolean;
   onRequestClose: () => void;
   items: OrderItemProps[];
}


export function ModalOrder({ isOpen, onRequestClose, items }: ModalOrderProps) {

   const customStyles = {
      content: {
         top: "50%",
         bottom: "auto",
         left: "50%",
         right: "auto",
         padding: "30px",
         transform: "translate(-50%, -50%)",
         backgroundColor: "#1d1d2e",
         borderRadius: "1.2rem"
      }
   }

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         style={customStyles}
      >
         <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{ background: "transparent", border: 0 }}
         >
            <FiX size={45} color="#f34748" className={styles.closeButton}/>
         </button>

         <div className={styles.orderDetails}>
            <h2>Detalhes do pedido</h2>
            <span className={styles.table}>
               Mesa: <strong>{items[0].order.table}</strong>
            </span>

            {items.map(item => (
               <section className={styles.containerItem} key={item.id}>
                  <span className={styles.product}>{item.amount}x <strong>{item.product.name}</strong></span>
                  <span className={styles.description}>{item.product.description}</span>
               </section>
            ))}

            <button className={styles.buttonOrder}>
               Concluir pedido
            </button>
         </div>

      </Modal>
   )
}