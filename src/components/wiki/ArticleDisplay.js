import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { selectBack, selectForward } from "../../actions/wiki";

const ArticleDisplay = ({ article, hasBack, hasForward, selectBack, selectForward }) => {
  if (!article) return <h2>No article selected</h2>

  const parseDate = date => {
    const dt = moment(date);
    return dt.format(dt._locale._longDateFormat.LLL);
  }

  const renderNav = () => (
    <h2 className="ui secondary menu header">
      {hasBack ? <button onClick={e => selectBack()} className="ui basic button item icon condensed"><i className="arrow left icon"></i></button> : null}
      <div className="item shrinkable">{article.title}</div>
      {hasForward ? <button onClick={e => selectForward()} className="ui basic button item icon floating right condensed"><i className="arrow right icon"></i></button> : null}
    </h2>
  )

  return (
    <Fragment>
      {renderNav()}
      <div className="ui basic segment">
        <div className="ui header">
          <div className="ui label">Word Count<div className='detail'>{article.wordcount}</div></div>
          <div className="ui label">Last Edited<div className='detail'>{parseDate(article.timestamp)}</div></div>
        </div>
        <div className="ui content" dangerouslySetInnerHTML={{ __html: article.snippet + ' ...' }}></div>
      </div>
      <div className="ui divider"></div>
      <a className="ui primary button" target='_blank' rel='noreferrer' href={'https://en.wikipedia.org?curid=' + article.pageid}>Go to Wikipedia</a>
    </Fragment>
  )
}

const mapStateToProps = ({ articles: { selected: { past, present, future } } }) => {
  return {
    article: present,
    hasBack: past.length > 0,
    hasForward: future.length > 0
  }
}

export default connect(mapStateToProps, { selectBack, selectForward })(ArticleDisplay);