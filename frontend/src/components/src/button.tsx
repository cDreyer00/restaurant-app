import { ButtonHTMLAttributes } from "react"
import { ReactNode } from "react"
import styles from "../styles/styles.module.scss"

import { FaSpinner } from "react-icons/fa"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   loading?: false,
   children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps) {
   return (
      <button className={styles.button}
         disabled={loading}
         {...rest}
      >
         {loading ? (
            <FaSpinner color="white" size={16} />
         ) : (
            <a className={styles.buttonText}>{children}</a>
         )}
      </button>
   )
}