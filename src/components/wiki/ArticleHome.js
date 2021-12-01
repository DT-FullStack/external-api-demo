import React, { Fragment } from 'react'
import ArticleSearch from './ArticleSearch';
import ArticleList from './ArticleList';
import ArticleDisplay from './ArticleDisplay';

const ArticleHome = props => {
  return (
    <Fragment>
      <div className="ui basic segment">
        <div className='ui row'>
          <h1 className='ui header'>Article Search</h1>
        </div>
        <ArticleSearch />
      </div>
      <div className="ui container grid">
        <div className='ui row'>
          <div className='column six wide'>
            <ArticleList />
          </div>
          <div className='column ten wide'>
            <ArticleDisplay />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ArticleHome
