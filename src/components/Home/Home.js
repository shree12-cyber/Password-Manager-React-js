import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Home.css";
import { GrUserManager, GrValidate } from "react-icons/gr";
import { CgPassword } from "react-icons/cg";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  let navigate = useNavigate();
  let auth = getAuth();
  let userEmail = localStorage.getItem("userEmail");
  // console.log(userEmail);

  const handleGenerator = () => {
    navigate("/generator");
  };
  const handleManager = () => {
    navigate("/manager");
  };
  const handleChecker = () => {
    navigate("/checker");
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
      localStorage.removeItem("useremail");
    });
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (response) => {
  //     console.log(response);
  //   });
  // }, []);
  return (
    <div className="container">
      <div className="Menu-container">
        <p>{userEmail}</p>
        <button onClick={logout}>Logout</button>
        <h1>Credentials management Sytem</h1>
        <button onClick={handleGenerator}>Generator</button>
        <button onClick={handleManager}>Manager</button>
        <button onClick={handleChecker}>Checker</button>
        {/* <>
          <h1>Credentials manager</h1>
          <nav class="nav">
            <input id="menu" type="checkbox" />
            <label for="menu">Menu</label>
            <ul class="menu">
              <li>
                <div className="a" onClick={handleGenerator}>
                  <span>Generator</span>
                  <i>
                    <CgPassword />
                  </i>
                </div>
              </li>
              <li>
                <div className="a" onClick={handleManager}>
                  <span>Manager</span>
                  <i>
                    <GrUserManager />
                  </i>
                </div>
              </li>
              <li>
                <div className="a" onClick={handleChecker}>
                  <span>Checker</span>
                  <i>
                    <GrValidate />
                  </i>
                </div>
              </li>
            </ul>
          </nav>
        </> */}
      </div>
    </div>
  );
}
