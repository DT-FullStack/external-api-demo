import React, { Fragment } from 'react'
import { connect } from "react-redux";
import { selectVideo } from "../../actions/youtube";


const VideoList = ({ videos, active_id, selectVideo }) => {
  const renderList = () => {
    return (
      <div className="ui divided list">
        {videos.items.map(video => (
          <div key={video.etag} className={video.etag === active_id ? "item clickable active" : "item clickable"} onClick={e => selectVideo(video)}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="ui rounded left floated image" />
            <h4 className="ui header">{video.snippet.title}</h4>
          </div>
        ))}
      </div>
    )
  }


  const { items } = videos;
  if (!items) return <h2>No Results</h2>;
  return (
    <Fragment>
      <h1 className='ui header'>YouTube Results</h1>
      {renderList()}
    </Fragment>

  );

}

const mapStateToProps = ({ video: { list, selected: { present } } }) => ({
  videos: list,
  active_id: present ? present.etag : null,
})

export default connect(mapStateToProps, { selectVideo })(VideoList);
