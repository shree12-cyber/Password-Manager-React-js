import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({ database }) {
  const [registerData, setRegisterData] = useState({});
  const collectionRef = collection(database, "userPasswords");
  const auth = getAuth();
  let navigate = useNavigate();

  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value };
    setRegisterData({ ...registerData, ...data });
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then((response) => {
        sessionStorage.setItem("userEmail", response.user.email);
        addDoc(collectionRef, {
          email: registerData.email,
          password: registerData.password,
          passwordsArray: [],
        }).then(() => {
          toast.success("You are now successfully registered ");
          // setTimeout(() => {
          //   toast.info("Go to Login page for Further process");
          // }, 100);
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="register-main">
      <ToastContainer />
      <h1>Register</h1>

      <div className="card-main">
        <div className="inputs-container">
          <input
            placeholder="Enter your Email"
            className="input-fields"
            onChange={onInput}
            type="email"
            name="email"
          />
          <input
            placeholder="Enter your Password"
            className="input-fields"
            onChange={onInput}
            name="password"
            type={"password"}
          />

          <button className="input-btn" onClick={register()}>
            Sign Up
          </button>
        </div>
      </div>
      <div>
        Already Have An Account? <Link to={"/"}>Login</Link> here!
      </div>
    </div>
  );
}
