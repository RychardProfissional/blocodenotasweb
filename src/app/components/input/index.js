import style from './input.module.css'

export function Input({children, error=false, className='', ...props})
{
  return (
    <div className={`${error??'error'} ${className} ${style.input_content}`}>
      <span>{children}</span>
      <input type="text" {...props}/>
    </div>
  )
}

export function SubmitInput(props){
  return <input className={style.submit_input} type='submit' {...props}/>
}

export default Input