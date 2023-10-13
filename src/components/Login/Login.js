import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const auth = getAuth();
  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value };
    setLoginData({ ...loginData, ...data });
  };
  let navigate = useNavigate();
  const login = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        localStorage.setItem("userEmail", response.user.email);
        toast.success("You are now successfully Logged in ");
        setTimeout(() => {
          navigate("/home");
        }, 500);
      })
      .catch((err) => [console.log(err.message)]);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Login</h1>

      <div>
        <div>
          <input
            placeholder="Enter your Email"
            onChange={onInput}
            type="email"
            name="email"
          />
          <input
            placeholder="Enter your Password"
            onChange={onInput}
            name="password"
            type={"password"}
          />
          <button onClick={() => login()}>Sign In</button>
        </div>
      </div>
      <div>
        Not Have An Account? <Link to={"/register"}>Register</Link> here!
      </div>
    </div>
  );
}
