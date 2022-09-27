import React from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
  const { setHeaderLink } = props;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setHeaderLink({
      name: "Регистрация",
      link: "/sign-up"
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
      // onLoginUser({
      //     name: name,
      //     about: description
      // });
  }

  return (
    <div className="login">
      <p className="login__title">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required className="login__input" type="text" value={username} onChange={handleChangeUsername} placeholder="Email"/>
        <input required className="login__input" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль"/>
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  )
}

export default withRouter(Login);
