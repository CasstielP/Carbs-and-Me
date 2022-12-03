import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css'
import logo from '../navigation/iconname.png'
import accountIcon from './gooincon.png'
import SideBar from '../sideBar';
const SignUpForm = ({showSideBar, setShowSideBar}) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [firstname, setFristname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let Errors = []


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([]);
      if(username.length<5 || username.length>20) Errors.push('Username length must be between 5 to 20 characters!')
      if(firstname.length<5 || firstname.length>20) Errors.push('Frist name length must be between 5 to 20 characters!')
      if(lastname.length<5 || lastname.length>20) Errors.push('Last name length must be between 5 to 20 characters!')
      if(!email.includes('@'||'.')) Errors.push('Invalid Email Format!')
      setErrors(Errors)
      if(Errors.length) return;
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      // if (data) {
        setErrors(data)
        window.alert('Welcome to Carb & Me !')
        history.push('/')
      // }
    }else return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFristname(e.target.value);
  };

  const updateLastName = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='su-pg-wrapper'>
    <SideBar showSideBar={showSideBar}/>
    <div className='signup-page'>
    <div className='signup-wrapper'>
    <div className='left-side'>
      <img className='logo-su' src={logo} />
      <h3 className='rightSide-text' id='h3text'>Create your Noogles Account</h3>
      <p className='rightSide-text' id='p-text'>to continue to Carbs & Me</p>
    <form className='su-form' onSubmit={onSignUp}>
      <div className="error-list">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='input-wrapper'>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='username'
          className='f-input-field input-field'
        ></input>
      </div>
      <div className='nameinfo-container input-wrapper'>
      <div>
        <input
          type='text'
          name='firstname'
          onChange={updateFirstName}
          value={firstname}
          placeholder='first name'
          className='input-field'
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='lastname'
          onChange={updateLastName}
          value={lastname}
          placeholder='last name'
          className='input-field'
        ></input>
      </div>
      </div>
      <div className='input-wrapper'>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Your email address'
          className='f-input-field input-field'
        ></input>
        <p className='fine-print'>reminder: email entered must be unique.</p>
      </div>

      <div className='password-container '>
      <div>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='password'
          className='input-field'
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='confirm'
          className='input-field'
        ></input>
      </div>
      </div>
      <p className='fine-print-p'>password must be between 5 to 20 characters</p>

      <div className='su-button-container'>
      <NavLink style={{ textDecoration: "none", color: "black" }} to="/login" exact={true}>
        <p className='su-button-content' id='su-button-p'>Sign in instead</p>
      </NavLink>
      <button id='su-button-s' type='submit'>Sign Up</button>
      </div>
    </form>
      </div>
      <div className='right-side'>
        <img src={accountIcon} />
        <p id='rs-text'>One Account. All recipes unlocked for you.</p>
      </div>
    </div>
    </div>

    </div>
    </>
  );
};

export default SignUpForm;
