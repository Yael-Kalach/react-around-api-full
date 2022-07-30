import React from 'react';
import { Link } from 'react-router-dom';

function Register (props){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister({password, email});
  }    
  
  
  return (
    <div>
      <form name="form" onSubmit={handleSubmit} className="registration-form">
        <h2 className="registration-form__title">Sign up</h2>
        <fieldset className="registration-form__fieldset">
          <input id="email-input" type="email" name="email" placeholder="Email" value={email || ''} onChange={onChangeEmail} className="registration-form__input_type_name registration-form__input" required minLength="2" maxLength="40" />
          <span id="email-input-error" className="registration-form__error"></span>
          <input id="password-input" type="password" name="password" placeholder="Password" value={password || ''} onChange={onChangePassword} className="registration-form__input_type_about registration-form__input" required minLength="8" maxLength="18" />
          <span id="password-input-error" className="registration-form__error"></span>
          <button type="submit" aria-label="save" className="registration-form__button">Sign up</button>
        </fieldset>
        <Link to="/signin" className="registration-form__link">Already a member? Log in here!</Link>
      </form>
    </div>
  )
  
}
  
export default Register;