import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Register(props) {
  const { setHeaderLink, onRegisterUser } = props;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

React.useEffect(() => {
    setHeaderLink({
      name: "Вход",
      link: "/sign-in"
    });
  }, [])


  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterUser({
      username: username,
      password: password
    });
  }

  return (
    <div className="signup">
      <p className="signup__title">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="signup__form">
        <input required className="signup__input" type="text" value={username} onChange={handleChangeUsername} placeholder="Email" />
        <input required className="signup__input" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <button type="submit" className="signup__button" >Войти</button>
      </form>
        <p className="signup__text">Уже зарегистрированы? <Link to="/sign-in" className="signup__login-link">Войти</Link></p>
    </div>
  )
}

export default withRouter(Register);