import styles from "../styles/styles.module.scss"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
   return (
      <input className={styles.input} {...rest} />
   )
}

export function TextArea({...rest}: TextareaHTMLAttributes<HTMLTextAreaElement>){
   return(
      <textarea className={styles.input} {...rest}></textarea>
   )
}