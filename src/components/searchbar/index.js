import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { onSearch } from "../../modules/login";
import { USER_LOGIN_SUCCESS } from "../../constants";

import "./searchbar.scss";

function SearchBar(props) {
  const [searchtext, setSearchtext] = useState("");

  const onSearchClicked = () => {
    console.log(props.login.searchTextCount);
    if (
      props.login.searchTextCount < 5 &&
      props.login.status !== USER_LOGIN_SUCCESS
    ) {
      props.onSearch();
      props.handleSearch(searchtext);
    } else {
      window.alert("Login First to make more searches");
    }
  };

  return (
    <div className="searchbar">
      <input
        value={searchtext}
        onChange={e => setSearchtext(e.target.value)}
      ></input>
      <button onClick={onSearchClicked}>Search</button>
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSearch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
