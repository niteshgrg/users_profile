import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import Img from "react-image";

import { USER_DATA_RECIEVED } from "../../constants";

import "./archive.scss";

function Archive(props) {
  let history = useHistory();
  const [searchtext, setSearchtext] = useState("");
  const [users, setUsers] = useState(props.users.users);
  const [albums, setAlbums] = useState(props.albums.albums);
  const [photos, setPhotos] = useState(props.photos.photos);

  useEffect(() => {
    if (props.users.status !== USER_DATA_RECIEVED) {
      history.replace("/");
    }
    // eslint-disable-next-line
  }, [props.users.status]);

  const handleSearch = () => {
    let tempAlbums = Object.assign({}, props.albums.albums);
    for (let i in tempAlbums) {
      tempAlbums[i] = tempAlbums[i].filter(album =>
        album.title.includes(searchtext)
      );
    }
    let tempPhotos = Object.assign({}, props.photos.photos);
    for (let i in tempPhotos) {
      tempPhotos[i] = tempPhotos[i].filter(photo =>
        photo.title.includes(searchtext)
      );
    }
    setPhotos(tempPhotos);
    setAlbums(tempAlbums);
    setUsers(props.users.users.filter(user => user.name.includes(searchtext)));
  };

  return (
    <div className="archive">
      <input
        value={searchtext}
        onChange={e => setSearchtext(e.target.value)}
      ></input>
      <button onClick={handleSearch}>Search</button>
      {users.map(user => {
        if (user.id in albums) {
          let albumIds = albums[user.id]
            .map(album => album.id)
            .filter(id => id in photos && photos[id].length > 0);
          if (albumIds.length > 0) {
            return (
              <div key={"user" + user.id} className="user_style">
                <span>{user.name}</span>
                <div className="albums_style">
                  {albumIds.map((id, index) => (
                    <div key={"album" + id} className="album_style">
                      <span>{albums[user.id][index].title}</span>
                      <div className="pictures_row">
                        {photos[id].map(picture => (
                          <div key={picture.id} className="picture_cell">
                            <span>{picture.title}</span>
                            <LazyLoad
                              width={200}
                              height={200}
                              debounce={false}
                              offsetVertical={500}
                            >
                              <Img
                                src={picture.url}
                                loader={
                                  <img
                                    src={picture.thumbnailUrl}
                                    alt="Album Art"
                                  />
                                }
                              />
                            </LazyLoad>
                          </div>
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
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.users,
  albums: state.albums,
  photos: state.photos,
  login: state.login
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
