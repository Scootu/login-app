import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Authenticated from "../Context/AuthContext";
import Input from "../UI/Input/Input";

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(Authenticated);
  // Reference 
  const ref = useRef(null);
  const refPass = useRef(null);
  const emailReducer = (state, actions) => {
    if (actions.type === "email") {
      return { value: actions.value, isValid: actions.value.includes("@") };
    }
    if (actions.type === "INPUT") {
      return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "this is not email" };
  };
  const passwordrReducer = (state, actions) => {
    if (actions.type === "email") {
      return { value: actions.value, isValid: actions.value.trim().length > 6 };
    }
    if (actions.type === "INPUT") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "this is not email", isValid: false };
  };
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    type: "email",
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordrReducer, {
    type: "email",
    value: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const TimerId = setTimeout(() => {
      console.log("up");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("down");
      clearTimeout(TimerId); //
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: "email",
      value: event.target.value,
    });
    //  setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "email",
      value: event.target.value,
    });
    // setFormIsValid(emailState.isValid && passwordState.isValid); this is so mush not recommanded
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
   
     if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      // we want to control in the input node from here !
      // console.log(ref.current);
      ref.current.focus();
    } else {
      refPass.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={ref}
          label={"E-mail"}
          isValid={emailIsValid}
          type={"email"}
          id={"email"}
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onValidateHandler={validateEmailHandler}
        />

        <Input
          ref={refPass}
          label={"Password"}
          isValid={passwordIsValid}
          type={"password"}
          id={"password"}
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onValidateHandler={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
