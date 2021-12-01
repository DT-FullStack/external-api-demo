import React, { Fragment } from "react";
import { connect } from "react-redux";
import { selectMusic, getMusic } from '../../actions/spotify';


// CLASS component
class MusicList extends React.Component {
  renderTrackList() {
    const { current_id, music: { tracks } } = this.props;
    if (tracks) {
      return (
        <Fragment>
          <h2 className="ui header">Tracks</h2>
          <div className="ui divided list">
            {tracks.items.map((track) => (
              <div className={current_id === track.id ? 'item active' : 'item'} key={track.id}>
                <div className='right floated content'>
                  <button
                    className='ui button primary'
                    onClick={() => this.props.selectMusic(track)}
                  >
                    Select
                  </button>
                </div>
                <div className='content'>
                  <b>{track.name}</b><br /><i>by {track.artists.map(artist => artist.name).join(', ')}</i>
                </div>
              </div>
            ))}

          </div>
        </Fragment>
      )
    }
  }
  renderArtistList() {
    const { current_id, music: { artists } } = this.props;
    if (artists) {
      return (
        <Fragment>
          <h2 className="ui header">Artists</h2>
          <div className="ui divided list">
            {artists.items.map(artist => (
              <div className={current_id === artist.id ? 'item active' : 'item'} key={artist.id}>
                <div className='right floated content'>
                  <button
                    className='ui button primary'
                    onClick={() => this.props.selectMusic(artist)}
                  >
                    Select
                  </button>
                </div>
                <div className='content'>
                  <b>{artist.name}</b><br /><i>{artist.genres.join(', ')}</i>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )
    }

  }
  renderAlbumList() {
    const { current_id, music: { albums } } = this.props;
    if (albums) {
      return (
        <Fragment>
          <h2 className="ui header">Albums</h2>
          <div className="ui divided list">
            {albums.items.map(album => (
              <div className={current_id === album.id ? 'item active' : 'item'} key={album.id}>
                <div className='right floated content'>
                  <button
                    className='ui button primary'
                    onClick={() => this.props.selectMusic(album)}
                  >
                    Select
                  </button>
                </div>
                <div className='content'>
                  <b>{album.name} - {album.release_date.slice(0, 4)}</b><br />by <i>{album.artists.map(artist => artist.name).join(', ')}</i>
                </div>
              </div>
            ))}

          </div>
        </Fragment>
      )
    }

  }
  renderList() {
    return (
      <Fragment>
        {this.renderArtistList()}
        {this.renderAlbumList()}
        {this.renderTrackList()}
      </Fragment>
    )
  }

  render() {
    const { tracks, artists, albums } = this.props.music;
    if (!tracks && !artists && !albums) return <h2>No Results</h2>;
    return (
      <React.Fragment>
        <h1 className='ui header'>Spotify Results</h1>
        {this.renderList()}
      </React.Fragment>

    );
  }
}

const mapStateToProps = ({ music: { list, selected: { present } } }) => ({
  music: list,
  current_id: present ? present.id : null
})

export default connect(mapStateToProps, { selectMusic, getMusic })(MusicList);
