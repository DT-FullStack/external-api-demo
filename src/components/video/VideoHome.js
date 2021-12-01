import React from 'react'
import { Fragment } from 'react'
import { connect } from "react-redux"
import VideoDisplay from './VideoDisplay'
import VideoList from './VideoList'
import VideoSearch from './VideoSearch'

const VideoHome = (props) => {

  return (
    <Fragment>
      <div className="ui basic segment">
        <div className='ui row'>
          <h1 className='ui header'>Video Search</h1>
        </div>
        <VideoSearch />
      </div>
      <div className="ui container grid">
        <div className='ui row'>
          <div className='column six wide'>
            <VideoList />
          </div>
          <div className='column ten wide'>
            <VideoDisplay />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(VideoHome)
