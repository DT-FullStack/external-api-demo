import React, { Fragment } from 'react'
import { connect } from "react-redux";
import { selectBack, selectForward } from "../../actions/youtube";

const VideoDisplay = ({ video, videoSrc, hasBack, hasForward, selectBack, selectForward }) => {
  if (video === null) return <h2>No video selected</h2>
  console.log(video);
  const renderNav = () => (
    <h2 className="ui secondary menu header">
      {hasBack ? <button onClick={e => selectBack()} className="ui basic button item icon condensed"><i className="arrow left icon"></i></button> : null}
      <div className="item shrinkable">{video.snippet.title}</div>
      {hasForward ? <button onClick={e => selectForward()} className="ui basic button item icon floating right condensed"><i className="arrow right icon"></i></button> : null}
    </h2>
  )

  return (
    <Fragment>
      {renderNav()}
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({ video: { selected: { past, present, future } } }) => {
  return {
    video: present,
    videoSrc: present ? `https://www.youtube.com/embed/${present.id.videoId}` : null,
    hasBack: past.length > 0,
    hasForward: future.length > 0
  }
}

export default connect(mapStateToProps, { selectBack, selectForward })(VideoDisplay)
