import React, { Fragment, useState } from 'react'
import AppLink from './layout/AppLink'

const Home = () => {
  const packages = {
    "Framework": 'React JS, React Router, Semantic UI Css',
    "State Management": 'Redux, React-Redux, Redux-Thunk',
    "Misc Packages": 'Lodash, Moment, Redux DevTools',
    "HTTP Requests": "Axios",
    'Spotify API': 'token auth',
    'Wikipedia API': 'no auth',
    'Youtube API': 'App Key auth through Google Cloud Console'
  }

  const addLabelEmphasis = ({ target }) => { target.classList.add('hover'); target.classList.add('red'); }
  const removeLabelEmphasis = ({ target }) => { target.classList.remove('hover'); target.classList.remove('red'); }

  const [showingDetails, setShowingDetails] = useState(false);
  const arrowClass = () => showingDetails ? 'angle right spin90 icon' : 'angle right icon';
  const toggle = () => setShowingDetails(!showingDetails);

  return (
    <Fragment>
      <h1 className='ui green header'>Multimedia Search Engine</h1>
      <h2 className='ui header'>This simple project connects to three external APIs to demonstrate knowledge of how to use endpoints and use the resulting data.</h2>

      <div id="APIS" className="ui basic segment">
        <div className="ui three cards">
          <div className="ui green card">
            <div className="content">
              <i className="green right floated big ui spotify icon" />
              <div className="header">Spotify</div>
              <div className="meta">Search Music Library</div>
              <div className="description">Find music by artist, track, or album</div>
            </div>
            <div className="extra content">
              <AppLink to='/music' >
                <div className="ui green button">Go</div>
              </AppLink>
            </div>
          </div>
          <div className="ui green card">
            <div className="content">
              <i className="gray right floated big  ui wikipedia w icon" ></i>
              <div className="header">Wikipedia</div>
              <div className="meta">Search articles</div>
              <div className="description">Find information about anything on the planet</div>
            </div>
            <div className="extra content">
              <AppLink to="/wiki">
                <div className="ui green button">Go</div>
              </AppLink>
            </div>
          </div>
          <div className="ui green card">
            <div className="content">
              <i className="red right floated big ui youtube icon" />
              <div className="header">YouTube</div>
              <div className="meta">Search Videos</div>
              <div className="description">Find and play your favorite internet vids</div>
            </div>
            <div className="extra content">
              <AppLink to="/youtube">
                <div className="ui green button">Go</div>
              </AppLink>
            </div>
          </div>
        </div>

      </div>
      <div className="ui divider"></div>

      <div id="HIGHLIGHTS" className="ui basic segment">
        <h3 className='ui red header toggle' onClick={toggle}><i className={arrowClass()}></i>Project Highlights</h3>
        {showingDetails && (
          <Fragment>
            <div className="ui three cards">
              <div className="ui raised red card">
                <div className="content">
                  <div className="header">Convenient UI</div>
                  <div className="description">
                    <div className="ui list">
                      <div className='item'>Searching and selecting results is made easy</div>
                      <div className='item'>Provides external links for more details</div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="ui raised red card">
                <div className="content">
                  <div className="header">Minimized API Calls</div>
                  <div className="description">
                    <div className="ui list">
                      <div className="item">Search-as-you-type functionality</div>
                      <div className="item">Carried out after the user stops typing</div>
                      <div className="item">Cached (memoized) to prevent duplicate search requests</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui raised red card">
                <div className="content">
                  <div className="header">State History</div>
                  <div className="description">
                    <div className="ui list">
                      <div className="item">Search results can be selected for more information</div>
                      <div className="item">Selected results are stored</div>
                      <div className="item">History of selected items is navigable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui basic center aligned segment">
              {
                Object.keys(packages).map(key => (
                  <div key={key} className="ui large label" onMouseEnter={addLabelEmphasis} onMouseLeave={removeLabelEmphasis}>
                    {key}
                    <div className="detail">{packages[key]}</div>
                  </div>
                ))
              }

            </div>
          </Fragment>
        )}
      </div>




    </Fragment>
  )
}

export default Home
