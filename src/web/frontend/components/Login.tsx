import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button"
import { Password } from 'primereact/password';

class Login extends Component<any, any> {

  render() {
    return (
      <form className="p-formgroup-inline" method="post" action="login" >
        <div className="p-field">
          <label htmlFor="username" className="p-sr-only">Username</label>
          <InputText id="username" name="username" type="text" placeholder="Username" />
        </div>
        <div className="p-field">
          <label htmlFor="password" className="p-sr-only">Password</label>
          <Password id="password" name="password" placeholder="Password" />
        </div>
        <Button type="submit" label="Submit" />
      </form>
    )
  }
}

export default Login;
