import React from 'react';
import { Link } from 'react-router-dom';

function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleLogin(password, email);
};

  return (
    <div>
      <form name="form" onSubmit={handleSubmit} className="registration-form">
        <h2 className="registration-form__title">Log in</h2>
        <fieldset className="registration-form__fieldset">
          <input id='email-input' type='email' name='email' placeholder='Email' value={email || ''} onChange={onChangeEmail} className='registration-form__input_type_name registration-form__input' required minLength='2' maxLength='40' />
          <span id="email-input-error" className="registration-form__error"></span>
          <input id='password-input' type='password' name='password' placeholder='Password' value={password || ''} onChange={onChangePassword} className='registration-form__input_type_about registration-form__input' required minLength="8" maxLength="18" />
          <span id="password-input-error" className="registration-form__error"></span>
          <button type="submit" aria-label="save" className="registration-form__button">Log in</button>
        </fieldset>
        <Link to="/signup" className="registration-form__link">Not a member yet? Sign up here!</Link>
      </form>
    </div>
  )
  
}
  
export default Login;