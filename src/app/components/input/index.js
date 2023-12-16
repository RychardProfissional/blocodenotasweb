import style from './input.module.css'

export default function Input({children, onInput, ...props})
{
  return (
    <div className={style.input_content}>
      <span>{children}</span>
      <input onInput={onInput} {...props}/>
    </div>
  )
}