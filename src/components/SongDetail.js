import React from "react";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { song: state.selectedSong }
}

const SongDetail = ({ song }) => {
  return (
    !song
      ? <h3 className='ui header'>No song selected</h3>
      : (
        <div>
          <h3 className='ui header'>Song Details</h3>
          <p>
            Title: {song.title}
            <br />
            Duration: {song.duration}
          </p>
        </div>
      )
  )
}

export default connect(mapStateToProps)(SongDetail);