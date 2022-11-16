import styles from "../styles/styles.module.scss"
import Link from "next/link"

import { FiLogOut } from "react-icons/fi"

export function Header() {
   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/dashboard">
               <img src="/logo.svg" />
            </Link>

            <nav>
               <Link href="/category">
                  Categoria
               </Link>
               <Link href="/product">
                  Cardápio
               </Link>

               <button>
                  <FiLogOut color="#FFF" size={24}/>
               </button>
            </nav>
         </div>
      </header>
   )
}