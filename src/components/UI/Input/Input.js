import React, { useImperativeHandle , useRef } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props,ref) => {

  const input_put = useRef(null);
  const activet = () => { 
    input_put.current.focus();
  }
  useImperativeHandle(ref,()=>{
    return {
      focus : activet 
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.label}</label>
      <input
        ref={input_put}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onValidateHandler}
      />
    </div>
  );
}
)
export default Input;
