import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Img from "react-image";

import { fetchUsersData } from "../../modules/users";
import { fetchAlbumsData } from "../../modules/albums";
import { fetchPhotosData } from "../../modules/photos";
import {
  USER_DATA_RECIEVED,
  ALBUMS_DATA_RECIEVED,
  PHOTOS_DATA_RECIEVED
} from "../../constants";

import "./homepage.scss";

function HomePage(props) {
  const [displayUsers, setDisplayUsers] = useState(false);

  useEffect(() => {
    if (
      props.users.status === USER_DATA_RECIEVED &&
      props.albums.status === ALBUMS_DATA_RECIEVED &&
      props.photos.status === PHOTOS_DATA_RECIEVED
    )
      setDisplayUsers(true);
    // eslint-disable-next-line
  }, [props.users.status, props.albums.status, props.photos.status]);

  useEffect(() => {
    props.fetchUsersData();
    props.fetchAlbumsData();
    props.fetchPhotosData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      {displayUsers ? (
        props.users.users.map(user => {
          if (user.id in props.albums.albums) {
            let albumIds = props.albums.albums[user.id]
              .map(album => album.id)
              .filter(
                id =>
                  id in props.photos.photos &&
                  props.photos.photos[id].length > 0
              );
            if (albumIds.length > 0) {
              return (
                <div key={"user" + user.id} className="user_style">
                  <Link to={"userDetails/" + user.id} className="bold">
                    {user.name}
                  </Link>
                  <div>
                    {albumIds.slice(0, 2).map((id, index) => (
                      <div key={"album" + id} className="album_style">
                        <span>{props.albums.albums[user.id][index].title}</span>
                        <div>
                          {props.photos.photos[id].slice(0, 2).map(picture => (
                            <Img
                              key={picture.id}
                              src={picture.url}
                              loader={
                                <img
                                  src={picture.thumbnailUrl}
                                  alt="Album Art"
                                />
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          }
          return null;
        })
      ) : (
        <div>Fetching Data...</div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.users,
  albums: state.albums,
  photos: state.photos,
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsersData,
      fetchAlbumsData,
      fetchPhotosData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
