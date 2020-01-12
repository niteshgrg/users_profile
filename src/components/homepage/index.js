import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PageSpan from "../pageSpan";

import { fetchUsersData, sortByField, deleteUser } from "../../modules/users";
import { changeTotalPages } from "../../modules/pageInfo";

import sort from "../../assets/sort.png";
import sortUp from "../../assets/sort-up.png";
import sortDown from "../../assets/sort-down.png";
import "./homepage.scss";

function HomePage(props) {
  const filteredUsers = users =>
    users.users
      .slice(
        (props.pageInfo.current_page - 1) * props.pageInfo.per_page,
        props.pageInfo.current_page * props.pageInfo.per_page
      )
      .map(user => {
        return {
          ...user,
          address: { ...user.address, geo: { ...user.address.geo } },
          company: { ...user.company }
        };
      });

  const [displayUsers, setDisplayUsers] = useState(filteredUsers(props.users));

  useEffect(() => {
    setDisplayUsers(filteredUsers(props.users));
    // eslint-disable-next-line
  }, [
    props.pageInfo.current_page,
    props.users.users.length,
    props.users.sortBy,
    props.users.sortOrder,
    props.pageInfo.per_page
  ]);

  useEffect(() => {
    props.changeTotalPages(props.users.users.length);
    // eslint-disable-next-line
  }, [props.users.users.length]);

  useEffect(() => {
    props.fetchUsersData();
    // eslint-disable-next-line
  }, []);

  const renderUsers = users => {
    if (users !== null) {
      return users.map((user, userIndex) => {
        let latLon =
          "lat: " + user.address.geo.lat + ", lng: " + user.address.geo.lng;
        return (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              {Object.values(user.address)
                .splice(0, Object.values(user.address).length - 1)
                .join(", ") +
                ", " +
                latLon}
            </td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{Object.values(user.company).join(", ")}</td>
            <td>
              <span>
                <Link to={"/users/" + user.id}>
                  <button>Open</button>
                </Link>
                <button onClick={() => props.deleteUser(user.id, userIndex)}>
                  Delete
                </button>
              </span>
            </td>
          </tr>
        );
      });
    }
    return null;
  };

  return (
    <div className="app">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="image_heading">
                <span>Name</span>
                <img
                  alt="Sort icon"
                  src={
                    props.users.sortBy !== "name"
                      ? sort
                      : props.users.sortOrder === "asc"
                      ? sortDown
                      : sortUp
                  }
                  onClick={() => props.sortByField("name")}
                />
              </div>
            </th>
            <th>Username</th>
            <th>
              <div className="image_heading">
                <span>Email</span>
                <img
                  alt="Sort icon"
                  src={
                    props.users.sortBy !== "email"
                      ? sort
                      : props.users.sortOrder === "asc"
                      ? sortDown
                      : sortUp
                  }
                  onClick={() => props.sortByField("email")}
                />
              </div>
            </th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderUsers(displayUsers)}</tbody>
      </table>
      <div className="pagination">
        <PageSpan />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.users,
  pageInfo: state.pageInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsersData,
      changeTotalPages,
      sortByField,
      deleteUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
