import "./style.css";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import RegisterForm from "../../components/login/RegisterForm";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
      </div>
    </div>
  );
}
