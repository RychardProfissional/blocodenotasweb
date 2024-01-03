import React from "react";
import style from "./input.module.css";

export function Input({
  children,
  error = false,
  label = "",
  className = "",
  ...props
}) {
  let input = <input className="text" {...props}></input>;

  switch (props.type ? props.type : "text") {
    case "submit":
      input = (
        <input className={`${style.submit_input} ${className}`} {...props} />
      );
      break;
    case "text":
    case "password":
      input = (
        <div
          className={`${error && style.error} ${
            style.content
          } ${className}`.trim()}
        >
          <input {...props} required />
          <span>{label}</span>
        </div>
      );
      break;
  }

  return input;
}

export default Input;
