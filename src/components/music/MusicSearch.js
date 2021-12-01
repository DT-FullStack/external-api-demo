import React from 'react'
import { getMusic, setMusicTerm, toggleMusicType } from '../../actions/spotify';
import { connect } from 'react-redux'
import _ from "lodash";
import { useMemo } from 'react';
import { useEffect } from 'react';
// import { wait } from '@testing-library/react';

const MusicSearch = ({ searchTerm, musicTypes, getMusic, toggleMusicType, setMusicTerm }) => {

  const memoized = useMemo(() => _.debounce(() => getMusic(searchTerm, musicTypes), 500),
    [getMusic, searchTerm, musicTypes]);

  useEffect(() => {
    memoized();
    return () => memoized.cancel();
  }, [memoized])

  useEffect(() => {
    const inputs = document.getElementById('MusicTypes').querySelectorAll('input');
    inputs.forEach(i => {
      const include = musicTypes.includes(i.getAttribute('value'))
      if (include) i.setAttribute('checked', true);
      else i.removeAttribute('checked');
    })
  }, [musicTypes])

  return (
    <div className='ui row'>
      <div className="ui form">
        <div className='ui fluid icon input'>
          <input value={searchTerm} onChange={e => setMusicTerm(e.target.value)} placeholder="Search" type="text" className='item' />
          <i className="inverted circular search link icon"></i>
        </div>
        <div className="field" id="MusicTypes">
          <div className="ui toggle checkbox" onClick={e => toggleMusicType('artist')}>
            <input name='musicType' value='artist' type='checkbox' tabIndex='0' className='hidden' />
            <label>Artists</label>
          </div>
          <div className="ui toggle checkbox" onClick={e => toggleMusicType('album')}>
            <input name='musicType' value='album' type='checkbox' tabIndex='0' className='hidden' />
            <label>Albums</label>
          </div>
          <div className="ui toggle checkbox" onClick={e => toggleMusicType('track')}>
            <input name='musicType' value='track' type='checkbox' tabIndex='0' className='hidden' />
            <label>Tracks</label>
          </div>
        </div>

      </div>
    </div >
  )
}

const mapStateToProps = ({ music }) => ({
  searchTerm: music.search.term,
  musicTypes: music.search.types
})

export default connect(mapStateToProps, { setMusicTerm, getMusic, toggleMusicType })(MusicSearch)
