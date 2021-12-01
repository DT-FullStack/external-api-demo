import React, { Fragment } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { getDetails, selectBack, selectForward } from "../../actions/spotify";


const MusicDetail = ({ music, getDetails, hasBack, hasForward, selectBack, selectForward }) => {
  if (!music) return <h3 className='ui header'>No music selected</h3>;

  // const { type, id } = music;
  const parseLength = duration_ms => {
    const dur = moment.duration(duration_ms, 'ms');
    return `${dur.minutes()}:${dur.seconds()}`;
  }
  const parseDate = YYYY_MM_DD => {
    const date = moment(YYYY_MM_DD);
    return date.format(date._locale._longDateFormat.LL)
  }

  const render = {
    track: ({ album, artists, track_number, duration_ms }) => (
      <div className="ui two cards">
        <div className="ui card">
          <div className="content">
            <div className="header">Artists</div>
            <div className="description">
              <div className="ui link list large">
                {artists.map(artist => renderLink(artist))}
              </div>
            </div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">Album</div>
            <div className="description">{album.name} - {album.release_date.slice(0, 4)}</div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">Length</div>
            <div className="meta">Track {track_number} / {album.total_tracks}</div>
            <div className="description">{parseLength(duration_ms)} min</div>
          </div>
        </div>
      </div>
    ),
    artist: ({ followers, genres }) => (
      <div className="ui two cards">
        <div className="card">
          <div className="content">
            <div className="header">Genres ({genres.length})</div>
            <div className="description flex">{genres.map(g => <div key={g} className="ui label">{g}</div>)}</div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">Spotify Followers</div>
            <div className="description">{followers.total}</div>
          </div>
        </div>
      </div>
    ),
    album: ({ album_type, release_date, total_tracks, artists }) => (
      <div className="ui two cards">
        <div className="ui card">
          <div className="content">
            <div className="header">Artists</div>
            <div className="description">
              <div className="ui link list large">
                {artists.map(artist => renderLink(artist))}
              </div>

            </div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">Release</div>
            <div className="description">
              <div className="ui list">
                <div className="item">
                  <div className="ui label">Type
                    <div className="detail">{album_type}</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ui label">Date
                    <div className="detail">{parseDate(release_date)}</div>
                  </div>
                </div>
                <div className="item">
                  <div className="ui label">Total Tracks
                    <div className="detail">{total_tracks}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
  const renderNav = () => (
    <h2 className="ui secondary menu header">
      {hasBack ? <button onClick={e => selectBack()} className="ui basic button item icon condensed"><i className="arrow left icon"></i></button> : null}
      <div className="item shrinkable">{`${music.type.slice(0, 1).toUpperCase()}${music.type.slice(1)} Details`}</div>
      {hasForward ? <button onClick={e => selectForward()} className="ui basic button item icon floating right condensed"><i className="arrow right icon"></i></button> : null}
    </h2>
  )
  const renderLink = ({ type, id, name }) => (
    <div key={id} onClick={e => getDetails(type, id)} className="item link">
      {name}
    </div>
  )

  const { external_urls: urls = {}, images, name } = music;
  return (
    <Fragment>
      {renderNav()}
      <div className="ui huge header">
        {images ? <img src={images[images.length - 1].url} alt={name} className="ui circular image" /> : null}
        <div className="content">{name}</div>
      </div>
      {render[music.type](music)}
      <div className="ui divider"></div>
      <div className="ui buttons">
        {urls.spotify ? <a className="ui button green" href={urls.spotify} target="_blank" rel="noreferrer">Open in Spotify</a> : null}
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({ music: { selected: { past, present, future } } }) => {
  return {
    music: present,
    hasBack: past.length > 0,
    hasForward: future.length > 0
  }
}

export default connect(mapStateToProps, { getDetails, selectBack, selectForward })(MusicDetail);