import React from 'react'
import { getVideos, setVideoTerm } from '../../actions/youtube';
import { connect } from 'react-redux'
import _ from "lodash";
import { useMemo } from 'react';
import { useEffect } from 'react';
// import { wait } from '@testing-library/react';

const VideoSearch = ({ searchTerm, getVideos, setVideoTerm }) => {

  const memoized = useMemo(() => _.debounce(() => getVideos(searchTerm), 500),
    [getVideos, searchTerm]);

  useEffect(() => {
    memoized();
    return () => memoized.cancel();
  }, [memoized])

  return (
    <div className='ui row'>
      <div className="ui form">
        <div className='ui fluid icon input'>
          <input value={searchTerm} onChange={e => setVideoTerm(e.target.value)} placeholder="Search" type="text" className='item' />
          <i className="inverted circular search link icon"></i>
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = ({ video }) => ({
  searchTerm: video.search.term
})

export default connect(mapStateToProps, { setVideoTerm, getVideos })(VideoSearch)
