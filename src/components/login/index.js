import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { login } from "../../modules/login";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  FIELDS_EMPTY
} from "../../constants";

import "./login.scss";

const Login = props => {
  const [userEmail, setuserEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  let history = useHistory();
  let location = useLocation();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (userEmail === "" || password === "") {
      setLoginError(FIELDS_EMPTY);
    } else {
      props.login(userEmail, password);
    }
  };

  useEffect(() => {
    if (props.loginInfo.status === USER_LOGIN_SUCCESS) {
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } else {
      setLoginError(props.loginInfo.status);
    }
    // eslint-disable-next-line
  }, [props.loginInfo.status]);

  return (
    <div className="login_page">
      {loginError === USER_LOGIN_ERROR ? (
        <div>Password Incorrect</div>
      ) : loginError === FIELDS_EMPTY ? (
        <div>Please enter all fields</div>
      ) : null}
      <form className="login_form" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="User Email"
          value={userEmail}
          onChange={e => setuserEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setpassword(e.target.value)}
        ></input>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loginInfo: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
