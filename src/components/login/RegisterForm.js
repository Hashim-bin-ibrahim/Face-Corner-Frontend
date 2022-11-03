import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirth from "./DateOfBirth";
import GenderSelect from "./GenderSelect";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const disptch = useDispatch();

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfos);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  //----------------registration validation-------------

  const registrationValidation = Yup.object({
    first_name: Yup.string()
      .required()
      .min(4, "first_name must be between 4 and 20 characters..")
      .max(20, "first_name must be between 4 and 20 characters..")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),
    last_name: Yup.string()
      .required()
      .min(2, "last_name must be between 2 and 20 characters..")
      .max(20, "last_name must be between 2 and 20 characters..")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),

    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain atleast 8 charaters.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        "password should contain at least one digit,one upper case and one lower case."
      ),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        disptch({ type: "LOGIN", payload: rest });
        cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            onClick={() => {
              setVisible(false);
            }}
            className="exit_icon"
          ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registrationValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let moreThan70 = new Date(1970 + 70, 0, 1);
            if (currentDate - pickedDate < atleast14) {
              setDateError("user must be 14 years old");
            } else if (currentDate - pickedDate > moreThan70) {
              setDateError("user must be below 70");
            } else if (gender === "") {
              setDateError("");
              setGenderError("specify your gender");
            } else {
              setDateError("");
              setGenderError("");
            }
            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <DateOfBirth
                bDay={bDay}
                handleRegisterChange={handleRegisterChange}
                days={days}
                bMonth={bMonth}
                months={months}
                bYear={bYear}
                dateError={dateError}
                years={years}
              />
              <GenderSelect
                handleRegisterChange={handleRegisterChange}
                genderError={genderError}
              />

              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              <MoonLoader color="blue" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
