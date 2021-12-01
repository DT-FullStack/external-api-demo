import React from 'react'
import { Fragment, useEffect } from 'react'
import { connect } from "react-redux"
import MusicDetail from './MusicDetail'
import MusicList from './MusicList'
import MusicSearch from './MusicSearch'
import { getToken } from '../../actions/spotify';

const MusicHome = ({ getToken }) => {
  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    }
    fetchToken()
  }, [getToken])

  return (
    <Fragment>
      <div className="ui basic segment">
        <div className='ui row'>
          <h1 className='ui header'>Music Search</h1>
        </div>
        <MusicSearch />
      </div>
      <div className="ui container grid">
        <div className='ui row'>
          <div className='column eight wide'>
            <MusicList />
          </div>
          <div className='column eight wide'>
            <MusicDetail />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getToken })(MusicHome)
