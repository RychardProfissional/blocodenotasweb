import React from 'react'
import style from './input.module.css'

export function Input({children, error=false, label = '', className='', type='text', ...props})
{
  let t, input = <div className=''></div>
  if (type.indexOf(' ') !== -1) [type, t] = type.split(' ')

  switch(type){
    case 'submit':
      props = {...props, type: type}

      input = (
        <input className={`${style.submit_input} ${className}`} type='submit' {...props}/>
      )
    break
    case 'text':
    case 'password':
      input = (
        <div className={`${style.content} ${className}${error? style.error: ''}`}>
          <input type={type} {...props} required/>
          <span>{label}</span>
        </div>
      )
    break
    default: 
      input = (<input className='text'></input>)
  }

  if(t === 'dropDown') {
    let c = children;

    input = React.cloneElement(
      input, {className: `${input.props.className} ${style.drop_down}`}, 
      <>
        {input.props.children} 
        <ul className={style.drop_down_content_itens}>
          {c?.map((e) => <li key={c.indexOf(e)} className={style.drop_down_iten}>{e}</li>)}  
        </ul>
      </>
    )
  }

  return input
}

export default Input