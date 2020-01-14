import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";

import { USER_DATA_RECIEVED, USER_LOGIN_SUCCESS } from "../../constants";

import "./userdetails.scss";

const UserDetails = props => {
  const [userDetails, setUserDetails] = useState(null);
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    if (props.userDetails.status === USER_DATA_RECIEVED) {
      let tempUserDetails = Object.assign(
        {},
        props.userDetails.users.filter(
          user => user.id === parseInt(props.match.params.userId)
        )[0]
      );
      if (props.loginInfo.status !== USER_LOGIN_SUCCESS) {
        tempUserDetails.phone = "Login to see Details";
        tempUserDetails.email = "Login to see Details";
      }
      setUserDetails(tempUserDetails);
    } else {
      history.replace("/");
    }
    // eslint-disable-next-line
  }, [props.userDetails.status, props.loginInfo.status]);

  const renderAlbums = () => {
    if (userDetails.id in props.albums.albums) {
      let albumIds = props.albums.albums[userDetails.id]
        .map(album => album.id)
        .filter(id => id in props.photos.photos);
      if (albumIds.length > 0) {
        return (
          <div>
            {albumIds.slice(0, 5).map((id, index) => (
              <div key={"album" + id} className="album_style">
                <span>{props.albums.albums[userDetails.id][index].title}</span>
                <div>
                  {props.photos.photos[id].slice(0, 2).map(picture => (
                    <img key={picture.id} src={picture.url} alt="Album Art" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="userdetails_page">
      {userDetails
        ? Object.keys(userDetails).map(key => (
            <div key={key} className="userinfo_row">
              <span>{key}</span>
              {userDetails[key] === "Login to see Details" ? (
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: location.pathname }
                  }}
                >
                  {userDetails[key]}
                </Link>
              ) : (
                <span>{JSON.stringify(userDetails[key])}</span>
              )}
            </div>
          ))
        : null}
      {userDetails ? renderAlbums() : null}
    </div>
  );
};

const mapStateToProps = state => ({
  loginInfo: state.login,
  userDetails: state.users,
  albums: state.albums,
  photos: state.photos
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
