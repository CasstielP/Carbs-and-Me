import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./login.css";
import siteLogo from "../navigation/iconname.png";
import SideBar from "../sideBar";
const LoginForm = ({showSideBar, setShowSideBar}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  //testing
  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserButton = (e) => {
    setEmail("cpss5433@gmail.com");
    setPassword("password");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="lg-pg-wrapper">
    <SideBar showSideBar={showSideBar}/>
    <div className="login-page-wrapper">
      <div className="login-wrapper">
        <div className="form-wrapper">
          <img className="logo-su-lg" src={siteLogo} />
          <p className="lg-h2">Sign in</p>
          <p id='lg-p'>To continue to Carbs&Me</p>
          <form className="li-form" onSubmit={onLogin}>
            <div className="error-list">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                className='lg-input-field'
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                className='lg-input-field'

              />
              <div className="su-button-container">
              <button className="lg-button" type="button" onClick={demoUserButton}>
                Demo User
              </button>
              <button className="lg-button" type="submit">Login</button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
