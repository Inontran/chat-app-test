import React from 'react';

import LoginState from './LoginState';
import LoginProps from './LoginProps';
import styles from './Login.module.scss';

class Login extends React.PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <div className = { styles.Login }>
        <form
          className = { styles.Form }
          action = 'post'
          onSubmit = { this.handlerFormSubmit }
        >
          <div>
            <label className = { styles.InputText }>
              <span className = { styles.Label }>Email</span>
              <input
                className = { styles.FieldInput }
                type = 'text'
                name = 'email'
                value = { this.state.email }
                onChange = { this.handlerInputChange }
              />
            </label>
          </div>
          <div>
            <label className = { styles.InputText }>
              <span className = { styles.Label }>Password</span>
              <input
                className = { styles.FieldInput }
                type = 'password'
                name = 'password'
                value = { this.state.password }
                onChange = { this.handlerInputChange }
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  private handlerFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const {
      email,
      password,
    } = this.state;

    if (email && password && this.props.login) {
      this.props.login(email, password);
    }
  }

  private handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    switch (inputName) {
      case 'email':
        this.setState({
          email: inputValue,
        });
        break;

      case 'password':
        this.setState({
          password: inputValue,
        });
        break;
    
      default:
        break;
    }
  }
}

export default Login;
