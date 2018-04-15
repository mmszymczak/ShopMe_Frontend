import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import './LoginButton.css';

const LoginButton = props => (
  <Link href="/login" to="/login" className="login-button">
    {props.isLogged ? props.t('components.UI.loginButton.labelLogged') : props.t('components.UI.loginButton.label')}
  </Link>
);

export { LoginButton };
export default translate()(LoginButton);
