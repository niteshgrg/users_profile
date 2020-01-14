import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../modules/login";
import { USER_LOGIN_SUCCESS } from "../../constants";
import "./navbar.scss";

const navBar = [
  { title: "home", link: "/" },
  { title: "about", link: "/about" },
  { title: "contact", link: "/contact" },
  { title: "archive", link: "/archive" }
];

function Navbar(props) {
  return (
    <div className="nav_bar">
      {navBar.map(item => (
        <Link key={item.title} to={item.link}>
          {item.title}
        </Link>
      ))}
      {props.login.status === USER_LOGIN_SUCCESS ? (
        <div onClick={props.logout}>Logout</div>
      ) : null}
      {props.login.status === USER_LOGIN_SUCCESS ? (
        <div>{props.login.userEmail}</div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
